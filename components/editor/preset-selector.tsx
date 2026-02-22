"use client";

import { useForgeStore } from "@/lib/store";
import { BASE_COLOR_LIST } from "@/lib/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PresetSelector() {
  const preset = useForgeStore((s) => s.preset);
  const setPreset = useForgeStore((s) => s.setPreset);

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Preset
      </label>
      <Select value={preset} onValueChange={setPreset}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select preset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="custom">Custom</SelectItem>
          {BASE_COLOR_LIST.map((color) => (
            <SelectItem key={color} value={color} className="capitalize">
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
