import {
  baseColors,
  themeColors,
  type BaseColorName,
  type ThemeColorName,
} from "./themes";

export interface ThemeConfig {
  baseColor: BaseColorName;
  themeColor: ThemeColorName;
  radius: number;
  fontFamily: string;
}

export function generateCSS(config: ThemeConfig): string {
  const base = baseColors[config.baseColor];
  const theme = themeColors[config.themeColor];

  const fontStack = `"${config.fontFamily}", ui-sans-serif, system-ui, sans-serif`;
  const lightVars: Record<string, string> = {
    ...base.light,
    ...theme.light,
    "--radius": `${config.radius}rem`,
    "--font-sans": fontStack,
    "--font-geist-sans": fontStack,
  };
  const darkVars: Record<string, string> = {
    ...base.dark,
    ...theme.dark,
    "--radius": `${config.radius}rem`,
    "--font-sans": fontStack,
    "--font-geist-sans": fontStack,
  };

  const formatVars = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");

  return `:root {\n${formatVars(lightVars)}\n}\n\n.dark {\n${formatVars(darkVars)}\n}\n\nbody {\n  --font-geist-sans: ${fontStack};\n}`;
}

export function generateTailwindConfig(config: ThemeConfig): string {
  const css = generateCSS(config);
  return `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}

${css}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}

export function generateComponentsJson(config: ThemeConfig): string {
  return JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc: true,
      tsx: true,
      tailwind: {
        config: "",
        css: "app/globals.css",
        baseColor: config.baseColor,
        cssVariables: true,
        prefix: "",
      },
      iconLibrary: "lucide",
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
      },
    },
    null,
    2
  );
}
