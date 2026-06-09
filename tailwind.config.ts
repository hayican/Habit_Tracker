/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. TYPOGRAPHY: Set font utama ke Inter (Notion Sans fallback)
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      
      // 2. COLORS: Mapping warna sesuai penamaan dari DESIGN.md
      colors: {
        primary: {
          DEFAULT: '#9B51E0',
          pressed: '#8A2BE2',
          deep: '#6B21A8',
        },
        brand: {
          navy: {
            DEFAULT: '#0F172A', 
            mid: '#1E293B',
          },
        },
        link: {
          blue: '#2563EB',
          pressed: '#1D4ED8',
        },

        canvas: '#FFFFFF',
        surface: {
          DEFAULT: '#F7F7F5',
          soft: '#F3F2F0',
        },

        hairline: {
          DEFAULT: '#E5E5E5',
          soft: '#F5F5F5',
          strong: '#D4D4D4',
        },

        ink: {
          deep: '#000000',
          DEFAULT: '#37352F', 
        },
        charcoal: '#333333',
        slate: '#6B7280',
        steel: '#9CA3AF',
        stone: '#D1D5DB',
        muted: '#E5E7EB',
        'on-dark': '#FFFFFF',
        'on-dark-muted': 'rgba(255, 255, 255, 0.7)',
        
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444', 
        }
      },

      // 3. SHAPES: Radius super penting! 
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',   
        lg: '12px',
        xl: '16px',
        xxl: '20px',
        xxxl: '24px',
        full: '9999px',
      },

      // 4. ELEVATION & DEPTH
        'level-1': '0px 1px 2px 0px rgba(15, 15, 15, 0.04)',
        'level-2': '0px 4px 12px 0px rgba(15, 15, 15, 0.08)',
        'level-3': '0px 24px 48px -8px rgba(15, 15, 15, 0.20)', 
        'level-4': '0px 16px 48px -8px rgba(15, 15, 15, 0.16)', 
      
      // 5. SPACING: Base unit
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        'section-sm': '40px',
        section: '64px',
        'section-lg': '96px',
        hero: '120px',
      }
    },
  },
  plugins: [],
}