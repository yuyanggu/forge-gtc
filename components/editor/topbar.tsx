"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ExportDialog } from "@/components/editor/export-dialog";

export function Topbar({
  exportOpen,
  onExportOpenChange,
}: {
  exportOpen?: boolean;
  onExportOpenChange?: (open: boolean) => void;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Image
          src="/forge_black.png"
          alt="Forge"
          width={120}
          height={36}
          className="h-9 w-auto dark:hidden"
          priority
        />
        <Image
          src="/forge_white.png"
          alt="Forge"
          width={120}
          height={36}
          className="h-9 w-auto hidden dark:block"
          priority
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle app theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        <ExportDialog open={exportOpen} onOpenChange={onExportOpenChange} />
      </div>
    </header>
  );
}
