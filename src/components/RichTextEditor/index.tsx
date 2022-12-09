// import dynamic from "next/dynamic";
// import EditorLoading from "./Loading";

// const Editor = dynamic(
//   async () => {
//     return () => null;
//   },
//   {
//     // Disable during server side rendering
//     ssr: false,
//     // Render anything as fallback on server, e.g. loader or html content without editor
//     loading: (props) => <EditorLoading {...props} />,
//   }
// );

const RichTextEditor: React.FC<Record<string, string>> = () => {
  return null;
};

export default RichTextEditor;
