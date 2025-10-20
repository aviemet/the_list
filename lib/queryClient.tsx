import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
			staleTime: 1000 * 60 * 5, // 5 minutes
		},
	},
})

export const persister = createAsyncStoragePersister({
	storage: AsyncStorage,
	key: "MOVIE_LISTS_CACHE",
})

export const PersistQueryClient = ({ children }: { children: React.ReactNode }) => (
	<PersistQueryClientProvider
		client={ queryClient }
		persistOptions={ { persister } }
	>
		{ children }
	</PersistQueryClientProvider>
)
