import { parse, formatHex } from "culori";

export function oklchToHex(oklchString: string): string {
  try {
    const color = parse(oklchString);
    if (!color) return "#808080";
    return formatHex(color) ?? "#808080";
  } catch {
    return "#808080";
  }
}
