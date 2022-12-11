import {
  RichTextEditor as Editor,
  RichTextEditorProps as EditorProps,
  Link,
} from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";
import { CodeBlock } from "./Controls";
import { createStyles, Input, InputWrapperProps } from "@mantine/core";
import "highlight.js/styles/github-dark.css";
import { useEffect } from "react";
import { HEADER_HEIGHT } from "../../utils";

interface RichTextEditorProps
  extends Omit<EditorProps, "withCodeHighlightStyles" | "editor" | "children"> {
  content: string;
  inputWrapperProps?: Omit<InputWrapperProps, "children">;
  onUpdate?: (html: string) => void;
}
const useStyles = createStyles((theme) => ({
  textEditor: {
    "& .mantine-RichTextEditor-content": {
      "& pre": {
        backgroundColor: theme.colors.dark[8],
        borderRadius: theme.radius.md,
        color: theme.white,
        fontFamily: theme.fontFamilyMonospace,
        padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
        tabSize: 4,
        "& code": {
          background: "none",
          color: "inherit",
          fontSize: theme.fontSizes.sm,
          padding: 0,
        },
      },
    },
  },
}));

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  inputWrapperProps,
  onUpdate,
  ...props
}) => {
  const { classes, cx } = useStyles();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          spellcheck: false,
        },
      }),
    ],
    content,
  });

  useEffect(() => {
    editor?.on("blur", (e) => {
      onUpdate?.(e.editor.getHTML());
    });
  }, [editor, onUpdate]);

  return (
    <Input.Wrapper withAsterisk label="w" {...inputWrapperProps}>
      <Editor
        {...props}
        withCodeHighlightStyles={false}
        className={cx(classes.textEditor, props.className)}
        editor={editor}
      >
        <Editor.Toolbar sticky stickyOffset={HEADER_HEIGHT}>
          <Editor.ControlsGroup>
            <Editor.Bold />
            <Editor.Italic />
            <Editor.Underline />
            <Editor.Strikethrough />
            <Editor.ClearFormatting />
            <Editor.Highlight />
            <Editor.Code />
            <CodeBlock />
          </Editor.ControlsGroup>

          <Editor.ControlsGroup>
            <Editor.H1 />
            <Editor.H2 />
            <Editor.H3 />
            <Editor.H4 />
          </Editor.ControlsGroup>

          <Editor.ControlsGroup>
            <Editor.Blockquote />
            <Editor.Hr />
            <Editor.BulletList />
            <Editor.OrderedList />
          </Editor.ControlsGroup>

          <Editor.ControlsGroup>
            <Editor.Link />
            <Editor.Unlink />
          </Editor.ControlsGroup>

          <Editor.ControlsGroup>
            <Editor.AlignLeft />
            <Editor.AlignCenter />
            <Editor.AlignJustify />
            <Editor.AlignRight />
          </Editor.ControlsGroup>
        </Editor.Toolbar>

        <Editor.Content />
      </Editor>
    </Input.Wrapper>
  );
};

export default RichTextEditor;
