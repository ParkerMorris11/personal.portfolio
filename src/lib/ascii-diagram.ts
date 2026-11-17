type Step = { label: string; detail: string };
type Layer = { name: string; items: readonly string[] };

const wrap = (text: string, width: number): string[] => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (word.length > width) {
      if (current) lines.push(current);
      for (let i = 0; i < word.length; i += width) {
        lines.push(word.slice(i, i + width));
      }
      current = "";
      continue;
    }
    const next = current ? `${current} ${word}` : word;
    if (next.length > width) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
};

const pad = (text: string, width: number, align: "left" | "center" = "left"): string => {
  const clipped = text.length > width ? text.slice(0, width) : text;
  const gap = width - clipped.length;
  if (align === "center") {
    const left = Math.floor(gap / 2);
    return `${" ".repeat(left)}${clipped}${" ".repeat(gap - left)}`;
  }
  return `${clipped}${" ".repeat(gap)}`;
};

const box = (title: string, body: string[], inner: number): string[] => {
  const top = `┌${"─".repeat(inner + 2)}┐`;
  const bottom = `└${"─".repeat(inner + 2)}┘`;
  const titleLine = `│ ${pad(title, inner, "center")} │`;
  const rule = `├${"─".repeat(inner + 2)}┤`;
  const bodyLines = body.map((line) => `│ ${pad(line, inner)} │`);
  return [top, titleLine, rule, ...bodyLines, bottom];
};

const stretchBox = (drawn: string[], height: number): string[] => {
  if (drawn.length >= height) return drawn;
  const bottom = drawn[drawn.length - 1];
  const innerWidth = Math.max(0, (drawn[0]?.length ?? 4) - 4);
  const blank = `│ ${" ".repeat(innerWidth)} │`;
  const missing = height - drawn.length;
  return [...drawn.slice(0, -1), ...Array.from({ length: missing }, () => blank), bottom];
};

const joinColumns = (columns: string[][], gutter: string): string[] => {
  const height = Math.max(...columns.map((column) => column.length));
  const padded = columns.map((column) => {
    const isBox = column[0]?.startsWith("┌");
    if (isBox) return stretchBox(column, height);
    const width = column[0]?.length ?? 0;
    const extra = Array.from({ length: height - column.length }, () => " ".repeat(width));
    return [...column, ...extra];
  });
  return Array.from({ length: height }, (_, row) =>
    padded.map((column) => column[row]).join(gutter),
  );
};

export const horizontalFlow = (steps: readonly Step[]): string => {
  const inner = Math.min(
    20,
    Math.max(16, ...steps.map((step) => Math.max(step.label.length, 16))),
  );
  const boxes = steps.map((step) => box(step.label, wrap(step.detail, inner), inner));
  const height = Math.max(...boxes.map((item) => item.length));
  const arrowRow = Math.floor(height / 2);
  const gutter = boxes.map((_, index) => {
    if (index === boxes.length - 1) return "";
    return Array.from({ length: height }, (__, row) => (row === arrowRow ? "-->" : "   "));
  });
  const columns: string[][] = [];
  boxes.forEach((item, index) => {
    columns.push(item);
    if (gutter[index]?.length) columns.push(gutter[index]);
  });
  return joinColumns(columns, "").join("\n");
};

export const verticalFlow = (steps: readonly Step[]): string => {
  const inner = Math.min(28, Math.max(18, ...steps.map((step) => step.label.length + 2)));
  const chunks = steps.map((step, index) => {
    const drawn = box(step.label, wrap(step.detail, inner), inner);
    if (index === steps.length - 1) return drawn;
    const width = drawn[0].length;
    const padLeft = Math.floor((width - 1) / 2);
    return [...drawn, `${" ".repeat(padLeft)}|`, `${" ".repeat(padLeft)}v`];
  });
  return chunks.flat().join("\n");
};

export const layerMap = (layers: readonly Layer[]): string => {
  const inner = Math.min(
    24,
    Math.max(14, ...layers.flatMap((layer) => [layer.name.length, ...layer.items.map((item) => item.length)])),
  );
  const boxes = layers.map((layer) => box(layer.name, [...layer.items], inner));
  return joinColumns(boxes, "  ").join("\n");
};

export const stackedLayers = (layers: readonly Layer[]): string => {
  const inner = Math.min(32, Math.max(20, ...layers.flatMap((layer) => layer.items.map((item) => item.length))));
  return layers
    .map((layer) => box(layer.name, layer.items.map((item) => item), inner).join("\n"))
    .join("\n");
};
