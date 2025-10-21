import { supabase } from "@/lib/supabase"

import { type SearchResult, type MediaType } from "./types"

export interface SearchOptions {
	query: string
	mediaTypes?: MediaType[]
	limit?: number
}

export async function searchAllSources(options: SearchOptions): Promise<SearchResult[]> {
	const { query, mediaTypes, limit = 10 } = options

	if(!query.trim()) {
		return []
	}

	const { data, error } = await supabase.functions.invoke("search-media", {
		body: {
			query,
			mediaTypes,
			limit,
		},
	})

	if(error) {
		console.error("Search error:", error)
		throw error
	}

	return data || []
}

