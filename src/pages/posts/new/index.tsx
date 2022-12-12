import { useRouter } from "next/router";
import Layout from "../../../elements/posts/layout";
import PostForm from "../../../elements/posts/post-form";
import withAuth from "../../../hoc/withAuth";
import { useAddPosts } from "../../../query/posts";
import { PostFormFields } from "../../../types/elements/posts";
import { NextPageWithLayout } from "../../../types/utils";
import { getErrorMessage, showNotification } from "../../../utils";

const NewPost: NextPageWithLayout = () => {
  const { mutate: create, isLoading: isCreating } = useAddPosts();
  const router = useRouter();

  const onCreate = (values: PostFormFields) => {
    create(values, {
      onSuccess: () => {
        router.push("/posts");
      },
      onError: (err) =>
        showNotification({ type: "danger", message: getErrorMessage(err) }),
    });
  };

  const onCancel = () => {
    router.push("/posts");
  };

  return (
    <PostForm onSubmit={onCreate} onCancel={onCancel} isLoading={isCreating} />
  );
};

NewPost.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default withAuth(NewPost);
