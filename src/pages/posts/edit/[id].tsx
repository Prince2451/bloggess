import { Box, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Layout from "../../../elements/posts/layout";
import PostForm from "../../../elements/posts/post-form";
import withAuth from "../../../hoc/withAuth";
import { useEditPost, usePost } from "../../../query/posts";
import { PostFormFields } from "../../../types/elements/posts";
import { NextPageWithLayout } from "../../../types/utils";
import { getErrorMessage } from "../../../utils/helpers/axios";
import { showNotification } from "../../../utils/helpers/notifications";

const PostEdit: NextPageWithLayout = () => {
  const router = useRouter();

  const id = typeof router.query.id === "string" ? router.query.id : "";
  const { mutate: edit, isLoading } = useEditPost();
  const { post, isLoading: isPostLoading } = usePost(
    { postId: id },
    { enabled: !!id }
  );

  const initialValues = useMemo(
    () => ({
      categories: post?.categories[0] || "",
      content: post?.content || "",
      coverImage: {
        url: post?.coverImage.url || "",
        value: null,
      },
      description: post?.description || "",
      tags: post?.tags || [],
      title: post?.title || "",
    }),
    [
      post?.categories,
      post?.content,
      post?.coverImage.url,
      post?.description,
      post?.tags,
      post?.title,
    ]
  );

  const onSubmit = (values: PostFormFields) => {
    edit(
      { ...values, id },
      {
        onSuccess: () => router.push("/posts"),
        onError: (err) =>
          showNotification({ message: getErrorMessage(err), type: "danger" }),
      }
    );
  };

  const onCancel = () => {
    router.push("/posts");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <LoadingOverlay visible={isPostLoading} />
      <PostForm
        initialValues={initialValues}
        enableReinitialization
        onSubmit={onSubmit}
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </Box>
  );
};

PostEdit.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default withAuth(PostEdit);
