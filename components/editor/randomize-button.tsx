"use client";

import { useState } from "react";
import { Dices, RotateCcw } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function RandomizeButton() {
  const randomize = useForgeStore((s) => s.randomize);
  const reset = useForgeStore((s) => s.reset);
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    randomize();
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
  };

  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={handleClick}
      >
        <Dices
          className={`h-4 w-4 transition-transform duration-500 ${spinning ? "rotate-[360deg]" : ""}`}
        />
        Try Random
      </Button>
      <Button
        variant="ghost"
        className="w-full gap-2"
        onClick={reset}
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
