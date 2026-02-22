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

        if (e.data.style) {
          document.documentElement.setAttribute("data-style", e.data.style);
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

        [data-style="nova"] {
          font-size: 14px;
        }
        [data-style="nova"] button,
        [data-style="nova"] [data-slot="card-header"],
        [data-style="nova"] [data-slot="card-content"],
        [data-style="nova"] [data-slot="card-footer"] {
          font-size: 0.8125rem;
        }
        [data-style="nova"] button {
          height: auto;
          padding-top: 0.375rem;
          padding-bottom: 0.375rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }
        [data-style="nova"] button[data-slot="sidebar-menu-button"],
        [data-style="nova"] button[data-slot="sidebar-trigger"] {
          padding: 0.25rem;
        }
        [data-style="nova"] [data-slot="card-header"] {
          padding: 1rem 1.25rem 0;
        }
        [data-style="nova"] [data-slot="card-content"] {
          padding: 0.75rem 1.25rem;
        }
        [data-style="nova"] [data-slot="card-footer"] {
          padding: 0 1.25rem 1rem;
        }
        [data-style="nova"] input,
        [data-style="nova"] textarea,
        [data-style="nova"] [data-slot="select-trigger"] {
          height: 2rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.8125rem;
        }
        [data-style="nova"] textarea {
          height: auto;
        }
        [data-style="nova"] [data-slot="alert"] {
          padding: 0.625rem 0.75rem;
          font-size: 0.8125rem;
        }
        [data-style="nova"] [data-slot="table-header"] th,
        [data-style="nova"] [data-slot="table-body"] td {
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
        }
        [data-style="nova"] [role="tablist"] {
          height: 2rem;
        }
        [data-style="nova"] [role="tab"] {
          font-size: 0.75rem;
          padding: 0.125rem 0.625rem;
        }
        [data-style="nova"] [data-slot="badge"] {
          font-size: 0.6875rem;
          padding: 0.0625rem 0.375rem;
        }
        [data-style="nova"] label {
          font-size: 0.8125rem;
        }
        [data-style="nova"] h2 {
          font-size: 0.75rem;
        }
      `}</style>
      <div className="min-h-screen bg-background font-sans text-foreground">
        <ComponentShowcase />
      </div>
    </>
  );
}
