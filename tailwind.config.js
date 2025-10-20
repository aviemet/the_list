import nativeWindPreset from "nativewind/preset"

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./features/**/*.{js,jsx,ts,tsx}",
	],
	presets: [nativeWindPreset],
	theme: {
		extend: {},
	},
	plugins: [],
}

