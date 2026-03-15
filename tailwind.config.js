module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			colors: {
				arch: {
					bg: '#FDFCF9', // Off-white/bone
					text: '#2C2C2C', // Deep charcoal
					accent: '#827D72', // Olive/Bronze muted tone
				},
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
