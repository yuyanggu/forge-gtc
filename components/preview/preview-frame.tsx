"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { useForgeStore } from "@/lib/store";
import { generateCSS } from "@/lib/css-generator";
import { getFontUrl } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BaseColorName, ThemeColorName } from "@/lib/themes";

type ViewportSize = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTHS: Record<ViewportSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

export function PreviewFrame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [iframeReady, setIframeReady] = useState(false);

  const { baseColor, themeColor, radius, fontFamily, mode, style } =
    useForgeStore();

  const sendUpdate = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const css = generateCSS({
      baseColor: baseColor as BaseColorName,
      themeColor: themeColor as ThemeColorName,
      radius,
      fontFamily,
    });

    iframe.contentWindow.postMessage(
      {
        type: "forge-theme-update",
        css,
        mode,
        fontUrl: getFontUrl(fontFamily),
        style,
      },
      "*"
    );
  }, [baseColor, themeColor, radius, fontFamily, mode, style]);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "forge-preview-ready") {
        setIframeReady(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (iframeReady) {
      sendUpdate();
    }
  }, [iframeReady, sendUpdate]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end gap-1 border-b bg-muted/30 px-4 py-2">
        {(
          [
            { size: "desktop", icon: Monitor, label: "Desktop" },
            { size: "tablet", icon: Tablet, label: "Tablet" },
            { size: "mobile", icon: Smartphone, label: "Mobile" },
          ] as const
        ).map(({ size, icon: Icon, label }) => (
          <Tooltip key={size}>
            <TooltipTrigger asChild>
              <Button
                variant={viewport === size ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewport(size)}
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div
        className="flex flex-1 items-start justify-center overflow-auto p-6"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <iframe
          ref={iframeRef}
          src="/preview"
          className="h-full rounded-lg shadow-sm ring-1 ring-border transition-[width] duration-300 ease-in-out"
          style={{
            width: VIEWPORT_WIDTHS[viewport],
            maxWidth: "100%",
            minHeight: "600px",
          }}
          title="Theme Preview"
        />
      </div>
    </div>
  );
}
