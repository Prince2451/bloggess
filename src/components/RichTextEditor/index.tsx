import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  // Disable during server side rendering
  ssr: false,

  // Render anything as fallback on server, e.g. loader or html content without editor
  loading: () => null,
});

export default RichTextEditor;
