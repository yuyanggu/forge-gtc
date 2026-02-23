"use client";

import { useState, useRef } from "react";
import { Check, Plus } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { oklchToHex } from "@/lib/colors";
import {
  THEME_COLOR_GROUPS,
  THEME_COLOR_DISPLAY_VALUES,
  THEME_COLOR_DISPLAY_NAMES,
  type ThemeColorName,
} from "@/lib/themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ThemeColorPicker() {
  const themeColor = useForgeStore((s) => s.themeColor);
  const setThemeColor = useForgeStore((s) => s.setThemeColor);
  const customColor = useForgeStore((s) => s.customColor);
  const setCustomColor = useForgeStore((s) => s.setCustomColor);

  const [hexInput, setHexInput] = useState(customColor || "#6366f1");
  const nativeRef = useRef<HTMLInputElement>(null);

  const colorsInOrder = THEME_COLOR_GROUPS.flatMap((g) => g.colors);
  const isCustomSelected = themeColor === "custom";

  function handleNativeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const hex = e.target.value;
    setHexInput(hex);
    setCustomColor(hex);
  }

  function handleHexInput(value: string) {
    setHexInput(value);
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      setCustomColor(value);
    }
  }

  function handlePopoverOpen(open: boolean) {
    if (open && customColor) {
      setHexInput(customColor);
    }
  }

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Theme Color
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        {colorsInOrder.map((color) => {
          const hex = oklchToHex(THEME_COLOR_DISPLAY_VALUES[color]);
          const isSelected = themeColor === color;
          return (
            <Tooltip key={color}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setThemeColor(color as ThemeColorName)}
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: hex }}
                  aria-label={`Theme color: ${THEME_COLOR_DISPLAY_NAMES[color]}`}
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
                {THEME_COLOR_DISPLAY_NAMES[color]}
              </TooltipContent>
            </Tooltip>
          );
        })}

        <Popover onOpenChange={handlePopoverOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={
                    isCustomSelected && customColor
                      ? { backgroundColor: customColor }
                      : undefined
                  }
                  aria-label="Custom color"
                >
                  {isCustomSelected && customColor ? (
                    <Check className="h-3.5 w-3.5 text-white drop-shadow-sm" />
                  ) : (
                    <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span
                    className={`absolute inset-0 rounded-full transition-opacity ${
                      isCustomSelected && customColor
                        ? "ring-2 ring-offset-2 ring-offset-background opacity-100 ring-primary"
                        : "border-2 border-dashed border-muted-foreground/40 group-hover:border-muted-foreground"
                    }`}
                  />
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              Custom
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-56 space-y-3" side="bottom" align="start">
            <Label className="text-xs font-medium">Custom Color</Label>
            <div className="flex items-center gap-2">
              <button
                className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-md border"
                style={{ backgroundColor: hexInput }}
                onClick={() => nativeRef.current?.click()}
                aria-label="Open color picker"
              >
                <input
                  ref={nativeRef}
                  type="color"
                  value={hexInput}
                  onChange={handleNativeChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  tabIndex={-1}
                />
              </button>
              <Input
                value={hexInput}
                onChange={(e) => handleHexInput(e.target.value)}
                placeholder="#6366f1"
                className="h-9 font-mono text-xs uppercase"
                maxLength={7}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
