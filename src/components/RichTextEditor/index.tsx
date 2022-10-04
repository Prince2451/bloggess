import dynamic from "next/dynamic";
import { Quill, RichTextEditorProps } from "@mantine/rte";
import hljs from "highlight.js";
import { StyledCodeBlock } from "./Quill";
import "highlight.js/styles/tokyo-night-dark.css";

Quill.register(StyledCodeBlock);

const Editor = dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,
  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const modules: RichTextEditorProps["modules"] = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
  };
  return <Editor modules={modules} {...props} />;
};

export default RichTextEditor;
