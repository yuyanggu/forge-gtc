"use client";

import { useForgeStore } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StylePicker() {
  const style = useForgeStore((s) => s.style);
  const setStyle = useForgeStore((s) => s.setStyle);

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Style
      </label>
      <div className="mt-2">
        <Select
          value={style}
          onValueChange={(v) => setStyle(v as "default" | "nova")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="nova">Nova (Compact)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
