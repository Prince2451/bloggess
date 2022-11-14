import Layout from "../../../elements/posts/layout";
import PostForm from "../../../elements/posts/post-form";
import withAuth from "../../../hoc/withAuth";
import { NextPageWithLayout } from "../../../types/utils";

const NewPost: NextPageWithLayout = () => {
  return <PostForm />;
};

NewPost.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default withAuth(NewPost);
