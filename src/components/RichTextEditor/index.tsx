import dynamic from "next/dynamic";
import type { RichTextEditorProps } from "@mantine/rte";
import { createStyles } from "@mantine/core";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { useMemo } from "react";
import EditorLoading from "./Loading";

const Editor = dynamic(
  async () => {
    const [{ RichTextEditor, Quill }, { StyledCodeBlock }] = await Promise.all([
      import("@mantine/rte"),
      import("./Quill"),
    ]);
    // registering
    Quill.register(StyledCodeBlock);
    return RichTextEditor;
  },
  {
    // Disable during server side rendering
    ssr: false,
    // Render anything as fallback on server, e.g. loader or html content without editor
    loading: (props) => <EditorLoading {...props} />,
  }
);

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& pre.bloggess-code-block": {
      backgroundColor: theme.colors.dark[8],
      color: theme.white,
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      fontSize: theme.fontSizes.sm,
    },
  },
}));

const RichTextEditor: React.FC<
  Omit<RichTextEditorProps, "classNames" | "modules">
> = (props) => {
  const { classes } = useStyles();

  const modules: RichTextEditorProps["modules"] = useMemo(
    () => ({
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
    }),
    []
  );
  return <Editor classNames={classes} modules={modules} {...props} />;
};

export default RichTextEditor;
