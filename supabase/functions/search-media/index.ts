import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

import { corsHeaders } from "../_shared/cors.ts"

interface SearchRequest {
	query: string
	mediaTypes?: string[]
	limit?: number
}

interface SearchResult {
	id: string
	title: string
	subtitle?: string
	year?: string
	posterUrl?: string
	description?: string
	mediaType: string
	externalId: string
	externalSource: string
}

async function searchOMDB(query: string, apiKey: string): Promise<SearchResult[]> {
	const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`

	const response = await fetch(url)
	const data = await response.json()

	if(data.Response === "False" || !data.Search) {
		return []
	}

	return data.Search.map((item: any) => ({
		id: `omdb-${item.Type}-${item.imdbID}`,
		externalId: item.imdbID,
		externalSource: "omdb",
		title: item.Title,
		year: item.Year,
		posterUrl: item.Poster !== "N/A" ? item.Poster : undefined,
		mediaType: item.Type === "series" ? "tv" : "movie",
	}))
}

async function searchGoogleBooks(query: string, apiKey: string, limit: number = 10): Promise<SearchResult[]> {
	const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${limit}&key=${apiKey}`

	const response = await fetch(url)
	const data = await response.json()

	if(!data.items) {
		return []
	}

	return data.items.map((volume: any) => ({
		id: `google-books-${volume.id}`,
		externalId: volume.id,
		externalSource: "google_books",
		title: volume.volumeInfo.title,
		subtitle: volume.volumeInfo.authors?.join(", "),
		year: volume.volumeInfo.publishedDate
			? new Date(volume.volumeInfo.publishedDate).getFullYear().toString()
			: undefined,
		posterUrl: volume.volumeInfo.imageLinks?.thumbnail
			?.replace("http://", "https://")
			?.replace("&edge=curl", ""),
		description: volume.volumeInfo.description,
		mediaType: "book",
	}))
}

async function getSpotifyToken(clientId: string, clientSecret: string): Promise<string> {
	const credentials = btoa(`${clientId}:${clientSecret}`)

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Authorization": `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "grant_type=client_credentials",
	})

	if(!response.ok) {
		throw new Error("Failed to get Spotify access token")
	}

	const data = await response.json()
	return data.access_token
}

async function searchSpotify(query: string, clientId: string, clientSecret: string, limit: number = 10): Promise<SearchResult[]> {
	const token = await getSpotifyToken(clientId, clientSecret)

	const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()

	if(!data.tracks?.items) {
		return []
	}

	return data.tracks.items.map((track: any) => {
		const artistNames = track.artists.map((artist: any) => artist.name).join(", ")
		const image = track.album.images.find((img: any) => img.height && img.height >= 300) || track.album.images[0]

		return {
			id: `spotify-track-${track.id}`,
			externalId: track.id,
			externalSource: "spotify",
			title: track.name,
			subtitle: artistNames,
			year: track.album.release_date ? new Date(track.album.release_date).getFullYear().toString() : undefined,
			posterUrl: image?.url,
			mediaType: "music",
		}
	})
}

serve(async(req) => {
	if(req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders })
	}

	try {
		const { query, mediaTypes, limit = 10 }: SearchRequest = await req.json()

		if(!query || !query.trim()) {
			return new Response(
				JSON.stringify({ error: "Query is required" }),
				{ status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
			)
		}

		const omdbKey = Deno.env.get("OMDB_API_KEY")
		const googleBooksKey = Deno.env.get("GOOGLE_BOOKS_API_KEY")
		const spotifyClientId = Deno.env.get("SPOTIFY_CLIENT_ID")
		const spotifyClientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET")

		const searchPromises: Promise<SearchResult[]>[] = []

		const shouldSearchMoviesTV = !mediaTypes ||
			mediaTypes.includes("movie") ||
			mediaTypes.includes("tv")

		const shouldSearchBooks = !mediaTypes || mediaTypes.includes("book")
		const shouldSearchMusic = !mediaTypes || mediaTypes.includes("music")

		if(shouldSearchMoviesTV && omdbKey) {
			searchPromises.push(searchOMDB(query, omdbKey).catch((error) => {
				console.error("OMDB search error:", error)
				return []
			}))
		}

		if(shouldSearchBooks && googleBooksKey) {
			searchPromises.push(searchGoogleBooks(query, googleBooksKey, limit).catch((error) => {
				console.error("Google Books search error:", error)
				return []
			}))
		}

		if(shouldSearchMusic && spotifyClientId && spotifyClientSecret) {
			searchPromises.push(searchSpotify(query, spotifyClientId, spotifyClientSecret, limit).catch((error) => {
				console.error("Spotify search error:", error)
				return []
			}))
		}

		const results = await Promise.allSettled(searchPromises)

		const allResults = results
			.filter((result): result is PromiseFulfilledResult<SearchResult[]> => result.status === "fulfilled")
			.flatMap((result) => result.value)

		const filteredResults = mediaTypes && mediaTypes.length > 0
			? allResults.filter((result) => mediaTypes.includes(result.mediaType))
			: allResults

		return new Response(
			JSON.stringify(filteredResults),
			{ headers: { ...corsHeaders, "Content-Type": "application/json" } }
		)
	} catch(error) {
		console.error("Search error:", error)
		return new Response(
			JSON.stringify({ error: error.message }),
			{ status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
		)
	}
})

