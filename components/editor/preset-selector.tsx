"use client";

import { useForgeStore } from "@/lib/store";
import { PRESETS, PRESET_LIST } from "@/lib/themes";
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
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Preset
      </label>
      <div className="mt-2">
        <Select value={preset} onValueChange={setPreset}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            {PRESET_LIST.map((key) => {
              const p = PRESETS[key];
              return (
                <SelectItem key={key} value={key}>
                  <span>{p.name}</span>
                  <span className="ml-2 text-muted-foreground">
                    {p.description}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
