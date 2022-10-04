import type { Quill } from "@mantine/rte";

declare module "@mantine/rte" {
  export interface RichTextEditorProps {
    quill?: typeof Quill | null
  }
}