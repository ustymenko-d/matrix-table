const animatePlugin = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',

				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
				},

				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},

				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
				},

				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)',
				},

				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)',
				},

				ring: 'var(--ring)',

				border: 'var(--border)',
			},
		},
	},
	plugins: [animatePlugin],
};
