import {
  baseColors,
  themeColors,
  type BaseColorName,
  type ThemeColorName,
} from "./themes";

interface AIPromptConfig {
  projectName: string;
  style: string;
  baseColor: string;
  themeColor: string;
  radius: number;
  fontFamily: string;
  mode: "light" | "dark";
}

function generateExportCSS(config: AIPromptConfig): string {
  const base = baseColors[config.baseColor as BaseColorName];
  const theme = themeColors[config.themeColor as ThemeColorName];

  const fontStack = `"${config.fontFamily}", ui-sans-serif, system-ui, sans-serif`;
  const lightVars: Record<string, string> = {
    ...base.light,
    ...theme.light,
    "--radius": `${config.radius}rem`,
    "--font-sans": fontStack,
  };
  const darkVars: Record<string, string> = {
    ...base.dark,
    ...theme.dark,
    "--radius": `${config.radius}rem`,
    "--font-sans": fontStack,
  };

  const formatVars = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");

  return `:root {\n${formatVars(lightVars)}\n}\n\n.dark {\n${formatVars(darkVars)}\n}`;
}

function generateTailwindTheme(): string {
  return `@theme inline {
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
}`;
}

export function generateAIPrompt(config: AIPromptConfig): string {
  const css = generateExportCSS(config);
  const tailwind = generateTailwindTheme();
  const heading = config.projectName
    ? `# Design System — ${config.projectName}`
    : `# Design System Configuration`;

  const styleDescription =
    config.style === "nova"
      ? "compact padding, tight margins, and reduced spacing for dense UIs"
      : "standard padding and spacing";

  return `${heading}

You are building UI with shadcn/ui, React, and Tailwind CSS v4.
Always use the design tokens below. Do not fall back to default
shadcn colors or invent new color values.

## Configuration
- Style: ${config.style}
- Base color: ${config.baseColor}
- Theme color: ${config.themeColor}
- Border radius: ${config.radius}rem
- Font family: ${config.fontFamily}
- Icon library: Lucide (via lucide-react)

## CSS Variables

Add to \`app/globals.css\`, replacing any existing theme variables:

\`\`\`css
${css.trim()}
\`\`\`

## Tailwind Theme

Add to \`app/globals.css\` after the CSS variables:

\`\`\`css
${tailwind.trim()}
\`\`\`

## Rules

1. Always use semantic token classes (\`bg-primary\`, \`text-muted-foreground\`, \`border-border\`, etc.) — never hardcode color values like \`bg-blue-500\` or raw oklch/hex values in components.
2. Use the \`${config.style}\` style: ${styleDescription}.
3. Every component and page must support both light and dark mode. The CSS variables above already define both modes — use them as-is.
4. Load "${config.fontFamily}" from Google Fonts. The font-sans variable is already configured in the Tailwind theme.
5. Use Lucide icons via \`lucide-react\`. Do not use heroicons, phosphor, or other icon sets.
6. When creating new components, follow shadcn/ui patterns: use \`cn()\` for class merging, \`cva()\` for variants, and \`Slot\` from Radix for composition.
7. Border radius uses the \`--radius\` variable. Use the Tailwind classes \`rounded-sm\`, \`rounded-md\`, \`rounded-lg\`, \`rounded-xl\` which derive from this base value.`;
}
