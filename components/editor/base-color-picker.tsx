"use client";

import { Check } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { oklchToHex } from "@/lib/colors";
import {
  BASE_COLOR_LIST,
  BASE_COLOR_DISPLAY_VALUES,
  type BaseColorName,
} from "@/lib/themes";

export function BaseColorPicker() {
  const baseColor = useForgeStore((s) => s.baseColor);
  const setBaseColor = useForgeStore((s) => s.setBaseColor);

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Base Color
      </label>
      <div className="flex flex-wrap gap-2">
        {BASE_COLOR_LIST.map((color) => {
          const hex = oklchToHex(BASE_COLOR_DISPLAY_VALUES[color]);
          const isSelected = baseColor === color;
          return (
            <button
              key={color}
              onClick={() => setBaseColor(color as BaseColorName)}
              className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
              style={{ backgroundColor: hex }}
              title={color}
              aria-label={`Base color: ${color}`}
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
