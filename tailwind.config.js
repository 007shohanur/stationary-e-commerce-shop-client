export default {
    darkMode: ['class', 'class'],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
    	extend: {
    		colors: {
				border: "#E5E7EB", // Replace with your desired border color
    			background: 'var(--shadcn-background)',
    			foreground: 'var(--shadcn-foreground)',
    			primary: 'var(--shadcn-primary)',
    			secondary: 'var(--shadcn-secondary)',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		}
    	}
    },
    plugins: [],
  };
  