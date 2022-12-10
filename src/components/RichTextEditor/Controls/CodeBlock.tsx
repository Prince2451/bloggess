import { useWindowEvent } from "@mantine/hooks";
import {
  RichTextEditor as Editor,
  RichTextEditorControlProps,
  useRichTextEditorContext,
} from "@mantine/tiptap";
import { IconSourceCode } from "@tabler/icons";
import React from "react";

const CodeBlock: React.FC<RichTextEditorControlProps> = (props) => {
  const extensionName = "codeBlock";
  const { editor } = useRichTextEditorContext();

  useWindowEvent("keydown", (event) => {
    if (
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      event.code === "Tab" &&
      editor?.isActive(extensionName)
    ) {
      event.preventDefault();
      if (event.shiftKey) {
        // remove tab
      } else {
        editor.commands.insertContent("\t");
      }
    }
  });
  return (
    <Editor.Control
      onClick={() => editor?.commands.toggleCodeBlock()}
      aria-label="Insert star emoji"
      title="Insert star emoji"
      active={editor?.isActive(extensionName)}
      {...props}
    >
      <IconSourceCode size={16} stroke={1.5} />
    </Editor.Control>
  );
};

export default CodeBlock;
