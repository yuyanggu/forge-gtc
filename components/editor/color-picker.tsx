"use client";

import { Check } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { oklchToHex } from "@/lib/colors";
import {
  THEME_COLOR_LIST,
  THEME_COLOR_DISPLAY_VALUES,
  type ThemeColorName,
} from "@/lib/themes";

export function ThemeColorPicker() {
  const themeColor = useForgeStore((s) => s.themeColor);
  const setThemeColor = useForgeStore((s) => s.setThemeColor);

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Theme Color
      </label>
      <div className="flex flex-wrap gap-2">
        {THEME_COLOR_LIST.map((color) => {
          const hex = oklchToHex(THEME_COLOR_DISPLAY_VALUES[color]);
          const isSelected = themeColor === color;
          return (
            <button
              key={color}
              onClick={() => setThemeColor(color as ThemeColorName)}
              className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
              style={{ backgroundColor: hex }}
              title={color}
              aria-label={`Theme color: ${color}`}
            >
              {isSelected && (
                <Check className="h-3.5 w-3.5 text-white drop-shadow-sm" />
              )}
              <span
                className={`absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-background transition-opacity ${isSelected ? "opacity-100 ring-primary" : "opacity-0 group-hover:opacity-100 ring-muted-foreground/50"}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
