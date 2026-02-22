"use client";

import { Sun, Moon } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function PreviewModeToggle() {
  const mode = useForgeStore((s) => s.mode);
  const setMode = useForgeStore((s) => s.setMode);

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Preview Mode
      </label>
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => {
          if (value === "light" || value === "dark") setMode(value);
        }}
        className="w-full"
      >
        <ToggleGroupItem value="light" className="flex-1 gap-1.5">
          <Sun className="h-4 w-4" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" className="flex-1 gap-1.5">
          <Moon className="h-4 w-4" />
          Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
