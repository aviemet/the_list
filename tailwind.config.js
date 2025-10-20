import nativeWindPreset from "nativewind/preset"
import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./features/**/*.{js,jsx,ts,tsx}",
	],
	presets: [nativeWindPreset],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: colors.orange[500],
					dark: colors.orange[600],
				},
				secondary: {
					DEFAULT: colors.indigo[500],
					dark: colors.indigo[600],
				},
				accent: {
					DEFAULT: colors.lime[400],
					dark: colors.lime[500],
				},
				muted: {
					DEFAULT: colors.amber[700],
					dark: colors.amber[800],
				},
				slate: {
					DEFAULT: colors.slate[600],
					dark: colors.slate[700],
				},
				olive: {
					DEFAULT: colors.green[700],
					dark: colors.green[800],
				},
				background: {
					DEFAULT: colors.white,
					dark: colors.slate[900],
				},
				link: {
					DEFAULT: colors.sky[200],
					dark: colors.sky[300],
				},
			},
			fontFamily: {
				sans: ["System"],
				mono: ["Menlo", "Monaco", "monospace"],
			},
		},
	},
	plugins: [],
}

