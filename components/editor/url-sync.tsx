"use client";

import { useEffect, useRef } from "react";
import { useForgeStore, serializeToParams, parseFromParams } from "@/lib/store";

export function URLSync() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const search = window.location.search.slice(1);
    if (search) {
      const parsed = parseFromParams(search);
      if (parsed) {
        useForgeStore.setState(parsed);
      }
    }
  }, []);

  useEffect(() => {
    const unsub = useForgeStore.subscribe((state) => {
      const params = serializeToParams(state);
      window.history.replaceState(null, "", `?${params}`);
    });
    return unsub;
  }, []);

  return null;
}
