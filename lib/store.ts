"use client";

import { create } from "zustand";
import {
  type BaseColorName,
  type ThemeColorName,
  BASE_COLOR_LIST,
  THEME_COLOR_LIST,
  RADIUS_VALUES,
  FONT_LIST,
} from "./themes";

export interface ForgeState {
  preset: string;
  baseColor: BaseColorName;
  themeColor: ThemeColorName;
  radius: number;
  fontFamily: string;
  mode: "light" | "dark";
  style: "default" | "nova";

  setPreset: (preset: string) => void;
  setBaseColor: (color: BaseColorName) => void;
  setThemeColor: (color: ThemeColorName) => void;
  setRadius: (radius: number) => void;
  setFontFamily: (font: string) => void;
  setMode: (mode: "light" | "dark") => void;
  setStyle: (style: "default" | "nova") => void;
  randomize: () => void;
  reset: () => void;
}

function randomElement<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const DEFAULTS = {
  preset: "neutral",
  baseColor: "neutral" as BaseColorName,
  themeColor: "neutral" as ThemeColorName,
  radius: 0.625,
  fontFamily: "Inter",
  mode: "light" as const,
  style: "default" as const,
};

export const useForgeStore = create<ForgeState>((set) => ({
  ...DEFAULTS,

  setPreset: (preset) => {
    if (preset === "custom") {
      set({ preset: "custom" });
      return;
    }
    const base = BASE_COLOR_LIST.includes(preset as BaseColorName)
      ? (preset as BaseColorName)
      : "neutral";
    set({
      preset,
      baseColor: base,
      themeColor: "neutral",
      radius: 0.625,
    });
  },

  setBaseColor: (color) => set({ baseColor: color, preset: "custom" }),
  setThemeColor: (color) => set({ themeColor: color, preset: "custom" }),
  setRadius: (radius) => set({ radius, preset: "custom" }),
  setFontFamily: (font) => set({ fontFamily: font }),
  setMode: (mode) => set({ mode }),
  setStyle: (style) => set({ style }),

  randomize: () => {
    set({
      preset: "custom",
      baseColor: randomElement(BASE_COLOR_LIST),
      themeColor: randomElement(THEME_COLOR_LIST),
      radius: randomElement(RADIUS_VALUES),
      fontFamily: randomElement(FONT_LIST),
    });
  },

  reset: () => set({ ...DEFAULTS }),
}));

export function serializeToParams(state: ForgeState): string {
  const params = new URLSearchParams();
  params.set("base", state.baseColor);
  params.set("theme", state.themeColor);
  params.set("radius", state.radius.toString());
  params.set("font", state.fontFamily);
  params.set("mode", state.mode);
  params.set("style", state.style);
  return params.toString();
}

export function parseFromParams(
  searchParams: string
): Partial<ForgeState> | null {
  const params = new URLSearchParams(searchParams);
  const result: Record<string, unknown> = {};
  let hasAny = false;

  const base = params.get("base");
  if (base && BASE_COLOR_LIST.includes(base as BaseColorName)) {
    result.baseColor = base;
    result.preset = "custom";
    hasAny = true;
  }

  const theme = params.get("theme");
  if (theme && THEME_COLOR_LIST.includes(theme as ThemeColorName)) {
    result.themeColor = theme;
    result.preset = "custom";
    hasAny = true;
  }

  const radius = params.get("radius");
  if (radius !== null) {
    const r = parseFloat(radius);
    if (!isNaN(r) && RADIUS_VALUES.includes(r)) {
      result.radius = r;
      result.preset = "custom";
      hasAny = true;
    }
  }

  const font = params.get("font");
  if (font && FONT_LIST.includes(font)) {
    result.fontFamily = font;
    hasAny = true;
  }

  const mode = params.get("mode");
  if (mode === "light" || mode === "dark") {
    result.mode = mode;
    hasAny = true;
  }

  const style = params.get("style");
  if (style === "default" || style === "nova") {
    result.style = style;
    hasAny = true;
  }

  return hasAny ? (result as Partial<ForgeState>) : null;
}
