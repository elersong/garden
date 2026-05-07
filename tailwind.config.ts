import type { Config } from 'tailwindcss'

const codeStyles = {
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  backgroundColor: 'var(--color-background-secondary)',
  padding: '0.1em 0.3em',
  borderRadius: '3px',
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        teal: {
          600: '#0F6E56',
          700: '#085041',
        }
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-headings': 'var(--color-text-secondary)',
            maxWidth: 'none',
            color: 'var(--color-text-secondary)',
            a: { color: 'var(--color-text-primary)' },
            strong: { color: 'var(--color-text-primary)', fontWeight: '500' },
            hr: { marginTop: '1em'},
            h2: {
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderBottom: '0.5px solid var(--color-border-tertiary)',
              paddingBottom: '0.375rem',
              marginTop: '1.75rem',
              marginBottom: '0.5rem',
            },
            blockquote: {
              borderLeftColor: 'var(--color-border-secondary)',
              borderLeftWidth: '2px',
              paddingLeft: '0.875rem',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-serif)',
            },
            code: codeStyles,
            'pre code': codeStyles,
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              borderRadius: '8px',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
