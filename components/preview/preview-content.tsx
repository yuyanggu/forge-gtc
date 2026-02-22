"use client";

import { useEffect, useRef } from "react";
import { ComponentShowcase } from "./component-showcase";

export function PreviewContent() {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const fontLinkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "forge-theme";
    document.head.appendChild(style);
    styleRef.current = style;

    const link = document.createElement("link");
    link.id = "forge-font-link";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    fontLinkRef.current = link;

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "forge-theme-update") {
        if (styleRef.current) {
          styleRef.current.textContent = e.data.css;
        }

        if (e.data.mode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        if (e.data.fontUrl && fontLinkRef.current) {
          fontLinkRef.current.href = e.data.fontUrl;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "forge-preview-ready" }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
      style.remove();
      link.remove();
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after {
          transition: background-color 150ms ease, color 150ms ease,
                      border-color 150ms ease, box-shadow 150ms ease;
        }
      `}</style>
      <div className="min-h-screen bg-background font-sans text-foreground">
        <ComponentShowcase />
      </div>
    </>
  );
}
