"use client";

import { useState } from "react";
import { ThemeSidebar } from "@/components/editor/theme-sidebar";
import { PreviewFrame } from "@/components/preview/preview-frame";
import { Topbar } from "@/components/editor/topbar";
import { URLSync } from "@/components/editor/url-sync";
import { KeyboardShortcuts } from "@/components/editor/keyboard-shortcuts";

export default function Home() {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <URLSync />
      <KeyboardShortcuts onOpenExport={() => setExportOpen(true)} />
      <Topbar exportOpen={exportOpen} onExportOpenChange={setExportOpen} />
      <div className="flex flex-1 overflow-hidden pt-14">
        <ThemeSidebar />
        <main className="relative flex flex-1 flex-col overflow-hidden">
          <PreviewFrame />
        </main>
      </div>
    </div>
  );
}
