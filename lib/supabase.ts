import "react-native-url-polyfill/auto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import Constants from "expo-constants"
import { Platform } from "react-native"

import { type Database } from "./types/database.types"

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl ?? process.env.EXPO_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ""

if(!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		"Missing Supabase credentials. Ensure EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY are set in .env file"
	)
}

let supabaseInstance: SupabaseClient<Database> | null = null

function getSupabaseClient() {
	if(supabaseInstance) {
		return supabaseInstance
	}

	supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
		auth: {
			storage: Platform.OS === "web" && typeof window === "undefined" ? undefined : AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
	})

	return supabaseInstance
}

export const supabase = new Proxy({} as SupabaseClient<Database>, {
	get(_target, prop) {
		const client = getSupabaseClient()
		return client[prop as keyof SupabaseClient<Database>]
	},
})
