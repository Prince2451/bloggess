import dynamic from "next/dynamic";
import type { RichTextEditorProps } from "@mantine/rte";
import { createStyles } from "@mantine/core";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

const Editor = dynamic(
  async () => {
    const { RichTextEditor, Quill } = await import("@mantine/rte");
    const { StyledCodeBlock } = await import("./Quill");
    // registering
    Quill.register(StyledCodeBlock);
    return RichTextEditor;
  },
  {
    // Disable during server side rendering
    ssr: false,
    // Render anything as fallback on server, e.g. loader or html content without editor
    loading: () => null,
  }
);

const useStyles = createStyles((theme) => ({
  root: {
    "& pre.bloggess-code-block": {
      backgroundColor: theme.colors.dark[8],
      color: theme.white,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      fontSize: theme.fontSizes.sm,
    },
  },
}));

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const { classes } = useStyles();

  const modules: RichTextEditorProps["modules"] = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
  };
  return <Editor classNames={classes} modules={modules} {...props} />;
};

export default RichTextEditor;
