"use client";

import { useForgeStore } from "@/lib/store";
import { Slider } from "@/components/ui/slider";
import { RADIUS_VALUES } from "@/lib/themes";

export function RadiusPicker() {
  const radius = useForgeStore((s) => s.radius);
  const setRadius = useForgeStore((s) => s.setRadius);

  const index = RADIUS_VALUES.indexOf(radius);
  const sliderValue = index >= 0 ? index : 4;

  const handleChange = (value: number[]) => {
    const idx = Math.round(value[0]);
    if (idx >= 0 && idx < RADIUS_VALUES.length) {
      setRadius(RADIUS_VALUES[idx]);
    }
  };

  const isDefault = radius === 0.625;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Radius
        </label>
        <span className="text-xs text-muted-foreground">
          {radius}rem{isDefault ? " (default)" : ""}
        </span>
      </div>
      <Slider
        min={0}
        max={RADIUS_VALUES.length - 1}
        step={1}
        value={[sliderValue]}
        onValueChange={handleChange}
      />
      <div className="flex items-center justify-center pt-1">
        <div
          className="h-10 w-20 border-2 border-primary transition-all duration-150"
          style={{ borderRadius: `${radius}rem` }}
        />
      </div>
    </div>
  );
}
