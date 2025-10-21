export type MediaType = "movie" | "tv" | "book" | "music"

export interface SearchResult {
	id: string
	title: string
	subtitle?: string
	year?: string
	posterUrl?: string
	description?: string
	mediaType: MediaType
	externalId: string
	externalSource: string
}

export interface GoogleBooksVolumeInfo {
	title: string
	subtitle?: string
	authors?: string[]
	publisher?: string
	publishedDate?: string
	description?: string
	pageCount?: number
	categories?: string[]
	imageLinks?: {
		smallThumbnail?: string
		thumbnail?: string
	}
	language?: string
	previewLink?: string
	infoLink?: string
}

export interface GoogleBooksVolume {
	id: string
	volumeInfo: GoogleBooksVolumeInfo
}

export interface GoogleBooksSearchResponse {
	kind: string
	totalItems: number
	items?: GoogleBooksVolume[]
}

