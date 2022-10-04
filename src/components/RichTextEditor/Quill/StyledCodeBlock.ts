import { Quill } from "@mantine/rte";

const CodeBlock = Quill.import("formats/code-block");

class StyledCodeBlock extends CodeBlock {
  static create() {
    const node: HTMLElement = super.create();
    node.classList.add("bloggess-code-block");
    return node;
  }
}

StyledCodeBlock.blotName = "code-block";
StyledCodeBlock.tagName = "pre";

export { StyledCodeBlock };
