"use client";

import { useEffect, useState } from "react";
import { useForgeStore } from "@/lib/store";

export function KeyboardShortcuts({
  onOpenExport,
}: {
  onOpenExport: () => void;
}) {
  const randomize = useForgeStore((s) => s.randomize);
  const mode = useForgeStore((s) => s.mode);
  const setMode = useForgeStore((s) => s.setMode);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      if (e.key === "e") {
        e.preventDefault();
        onOpenExport();
      } else if (e.key === "d") {
        e.preventDefault();
        setMode(mode === "dark" ? "light" : "dark");
      } else if (e.key === "r" && e.shiftKey) {
        e.preventDefault();
        randomize();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenExport, randomize, mode, setMode]);

  return null;
}

export function useExportDialogState() {
  const [open, setOpen] = useState(false);
  return { open, setOpen, onOpen: () => setOpen(true) };
}
