"use client";

import { useForgeStore } from "@/lib/store";
import { FONT_LIST } from "@/lib/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FontPicker() {
  const fontFamily = useForgeStore((s) => s.fontFamily);
  const setFontFamily = useForgeStore((s) => s.setFontFamily);

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Font Family
      </label>
      <div className="mt-2">
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONT_LIST.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
