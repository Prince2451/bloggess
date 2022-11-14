import { Paper } from "@mantine/core";
import PostForm from "../../../elements/posts/post-form";
import withAuth from "../../../hoc/withAuth";
import { NextPageWithLayout } from "../../../types/utils";

const PostEdit: NextPageWithLayout = () => {
  return <PostForm />;
};

PostEdit.getLayout = (page) => {
  return (
    <Paper radius="md" px="md" pt="md" style={{ height: "100%" }}>
      {page}
    </Paper>
  );
};

export default withAuth(PostEdit);
