"use client";

import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { useForgeStore } from "@/lib/store";
import {
  generateCSS,
  generateTailwindConfig,
  generateComponentsJson,
} from "@/lib/css-generator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BaseColorName, ThemeColorName } from "@/lib/themes";

function CopyButton({ text }: { text: string }) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      onClick={handleCopy}
    >
      <Copy className="h-3.5 w-3.5" />
      Copy
    </Button>
  );
}

export function ExportDialog({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { baseColor, themeColor, radius, fontFamily } = useForgeStore();

  const config = {
    baseColor: baseColor as BaseColorName,
    themeColor: themeColor as ThemeColorName,
    radius,
    fontFamily,
  };

  const cssOutput = generateCSS(config);
  const tailwindOutput = generateTailwindConfig(config);
  const componentsOutput = generateComponentsJson(config);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Theme</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="css" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="css" className="flex-1">
              CSS Variables
            </TabsTrigger>
            <TabsTrigger value="tailwind" className="flex-1">
              Tailwind Config
            </TabsTrigger>
            <TabsTrigger value="components" className="flex-1">
              components.json
            </TabsTrigger>
          </TabsList>

          <TabsContent value="css" className="space-y-3">
            <div className="flex justify-end">
              <CopyButton text={cssOutput} />
            </div>
            <pre className="max-h-96 overflow-auto rounded-lg border bg-muted p-4 text-xs leading-relaxed">
              <code>{cssOutput}</code>
            </pre>
          </TabsContent>

          <TabsContent value="tailwind" className="space-y-3">
            <div className="flex justify-end">
              <CopyButton text={tailwindOutput} />
            </div>
            <pre className="max-h-96 overflow-auto rounded-lg border bg-muted p-4 text-xs leading-relaxed">
              <code>{tailwindOutput}</code>
            </pre>
          </TabsContent>

          <TabsContent value="components" className="space-y-3">
            <div className="flex justify-end">
              <CopyButton text={componentsOutput} />
            </div>
            <pre className="max-h-96 overflow-auto rounded-lg border bg-muted p-4 text-xs leading-relaxed">
              <code>{componentsOutput}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
