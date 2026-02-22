"use client";

import { BaseColorPicker } from "./base-color-picker";
import { ThemeColorPicker } from "./color-picker";
import { RadiusPicker } from "./radius-picker";
import { FontPicker } from "./font-picker";
import { PreviewModeToggle } from "./mode-toggle";
import { StylePicker } from "./style-picker";
import { PresetSelector } from "./preset-selector";
import { RandomizeButton } from "./randomize-button";

export function ThemeSidebar() {
  return (
    <aside className="flex w-80 flex-shrink-0 flex-col border-r bg-background">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <PresetSelector />
          <BaseColorPicker />
          <ThemeColorPicker />
          <RadiusPicker />
          <FontPicker />
          <StylePicker />
          <PreviewModeToggle />
          <RandomizeButton />
        </div>
      </div>
    </aside>
  );
}
