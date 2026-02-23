import { parse, formatHex, converter } from "culori";
import type { CSSVarMap } from "./themes";

const toOklch = converter("oklch");

export function oklchToHex(oklchString: string): string {
  try {
    const color = parse(oklchString);
    if (!color) return "#808080";
    return formatHex(color) ?? "#808080";
  } catch {
    return "#808080";
  }
}

export function hexToOklch(hex: string): string {
  try {
    const color = toOklch(parse(hex)!);
    if (!color) return "oklch(0.5 0 0)";
    const l = color.l.toFixed(3);
    const c = (color.c ?? 0).toFixed(3);
    const h = (color.h ?? 0).toFixed(3);
    return `oklch(${l} ${c} ${h})`;
  } catch {
    return "oklch(0.5 0 0)";
  }
}

export function generateCustomThemeVars(hex: string): {
  light: CSSVarMap;
  dark: CSSVarMap;
} {
  const parsed = parse(hex);
  if (!parsed) return { light: {}, dark: {} };

  const oklch = toOklch(parsed);
  if (!oklch) return { light: {}, dark: {} };

  const l = oklch.l ?? 0.5;
  const c = oklch.c ?? 0;
  const h = oklch.h ?? 0;

  const lightL = Math.max(0.35, Math.min(0.65, l));
  const darkL = Math.max(0.6, Math.min(0.8, lightL + 0.15));

  const lightPrimary = `oklch(${lightL.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)})`;
  const darkPrimary = `oklch(${darkL.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)})`;

  const lightFg =
    lightL < 0.55
      ? "oklch(0.985 0 0)"
      : "oklch(0.21 0.006 285.885)";
  const darkFg =
    darkL < 0.65
      ? "oklch(0.985 0 0)"
      : "oklch(0.21 0.006 285.885)";

  return {
    light: {
      "--primary": lightPrimary,
      "--primary-foreground": lightFg,
      "--ring": lightPrimary,
      "--sidebar-primary": lightPrimary,
      "--sidebar-primary-foreground": lightFg,
    },
    dark: {
      "--primary": darkPrimary,
      "--primary-foreground": darkFg,
      "--ring": darkPrimary,
      "--sidebar-primary": darkPrimary,
      "--sidebar-primary-foreground": "oklch(0.985 0 0)",
    },
  };
}
