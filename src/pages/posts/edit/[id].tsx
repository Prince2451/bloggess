import Layout from "../../../elements/posts/layout";
import PostForm from "../../../elements/posts/post-form";
import withAuth from "../../../hoc/withAuth";
import { NextPageWithLayout } from "../../../types/utils";

const PostEdit: NextPageWithLayout = () => {
  const onSubmit = () => null;
  return <PostForm onSubmit={onSubmit} isLoading={false} />;
};

PostEdit.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default withAuth(PostEdit);
