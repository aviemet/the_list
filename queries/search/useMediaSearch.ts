import { useQuery } from "@tanstack/react-query"

import { searchAllSources, type SearchOptions, type SearchResult } from "@/lib/api"

export function useMediaSearch(options: SearchOptions) {
	return useQuery<SearchResult[], Error>({
		queryKey: ["media-search", options.query, options.mediaTypes],
		queryFn: () => searchAllSources(options),
		enabled: !!options.query && options.query.trim().length > 0,
		staleTime: 1000 * 60 * 5,
	})
}

