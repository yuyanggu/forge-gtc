"use client";

import { useState } from "react";
import { Dices } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function RandomizeButton() {
  const randomize = useForgeStore((s) => s.randomize);
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    randomize();
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
  };

  return (
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
  );
}
