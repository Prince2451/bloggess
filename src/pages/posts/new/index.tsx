import Layout from "../../../elements/posts/layout";
import PostForm from "../../../elements/posts/post-form";
import withAuth from "../../../hoc/withAuth";
import { useAddPosts } from "../../../query/posts";
import { PostFormFields } from "../../../types/elements/posts";
import { NextPageWithLayout } from "../../../types/utils";
import { getErrorMessage, showNotification } from "../../../utils";

const NewPost: NextPageWithLayout = () => {
  const { mutate: create, isLoading: isCreating } = useAddPosts();

  const onCreate = (values: PostFormFields) => {
    create(values, {
      onError: (err) =>
        showNotification({ type: "danger", message: getErrorMessage(err) }),
    });
  };

  return <PostForm onSubmit={onCreate} isLoading={isCreating} />;
};

NewPost.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default withAuth(NewPost);
