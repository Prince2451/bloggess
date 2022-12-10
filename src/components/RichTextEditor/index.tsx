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

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>Editor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>Editor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

type RichTextEditorProps = EditorProps;

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
  });

  return (
    <Editor editor={editor}>
      <Editor.Toolbar sticky stickyOffset={60}>
        <Editor.ControlsGroup>
          <Editor.Bold />
          <Editor.Italic />
          <Editor.Underline />
          <Editor.Strikethrough />
          <Editor.ClearFormatting />
          <Editor.Highlight />
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
  );
};

export default RichTextEditor;
