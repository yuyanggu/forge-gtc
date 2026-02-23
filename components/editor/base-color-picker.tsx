"use client";

import { Check } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { oklchToHex } from "@/lib/colors";
import {
  BASE_COLOR_LIST,
  BASE_COLOR_DISPLAY_VALUES,
  BASE_COLOR_DISPLAY_NAMES,
  type BaseColorName,
} from "@/lib/themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BaseColorPicker() {
  const baseColor = useForgeStore((s) => s.baseColor);
  const setBaseColor = useForgeStore((s) => s.setBaseColor);

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Base Color
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {BASE_COLOR_LIST.map((color) => {
          const hex = oklchToHex(BASE_COLOR_DISPLAY_VALUES[color]);
          const isSelected = baseColor === color;
          return (
            <Tooltip key={color}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setBaseColor(color as BaseColorName)}
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: hex }}
                  aria-label={`Base color: ${BASE_COLOR_DISPLAY_NAMES[color]}`}
                >
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                  )}
                  <span
                    className={`absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-background transition-opacity ${isSelected ? "opacity-100 ring-primary" : "opacity-0 group-hover:opacity-100 ring-muted-foreground/50"}`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {BASE_COLOR_DISPLAY_NAMES[color]}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
