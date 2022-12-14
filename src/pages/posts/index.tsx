import { DataTable, DataTableColumn } from "mantine-datatable";
import React, { useState } from "react";
import {
  ActionIcon,
  Badge,
  BadgeProps,
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { capitalize } from "lodash";
import withAuth from "../../hoc/withAuth";
import { NextPageWithLayout } from "../../types/utils";
import Image from "next/image";
import dayjs from "dayjs";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons";
import Link from "../../components/navigation/link";
import { useRouter } from "next/router";
import { usePosts, useDeletePost } from "../../query/posts";
import { Post } from "../../types/elements/posts";
import { openConfirmModal } from "@mantine/modals";
import {
  showNotification,
  updateNotification,
} from "../../utils/helpers/notifications";
import { getErrorMessage } from "../../utils/helpers/axios";

const useStyles = createStyles((theme) => ({
  postIndex: {
    ...theme.fn.variant({ variant: "filled" }),
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  tableData: {
    width: "max-content",
  },
}));

const Posts: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const { posts, totalCount, isLoading } = usePosts({
    page: page,
    size: 10,
  });
  const { mutate: del } = useDeletePost();

  const badgeColors: Record<string, BadgeProps["color"]> = {
    nature: "green",
    engineering: "blue",
  };

  const onDeletePost = (postId: Post["id"]) => {
    openConfirmModal({
      modalId: "delete-post",
      title: "Delete This Post?",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this post? This action irreversible
        </Text>
      ),
      labels: { confirm: "Delete post", cancel: "Cancel" },
      confirmProps: { color: "red.7" },
      onConfirm: () => {
        showNotification({
          id: "deleting-posts",
          title: "Deleting...",
          message: "Deleting your posts",
          loading: true,
          autoClose: false,
          disallowClose: true,
        });
        del(
          { postId },
          {
            onSuccess: () => {
              updateNotification({
                id: "deleting-posts",
                loading: false,
                type: "success",
                message: "Post deleted successfully",
                title: "Deleted",
                autoClose: 3000,
              });
            },
            onError: (err) => {
              updateNotification({
                id: "deleting-posts",
                loading: false,
                type: "danger",
                message: getErrorMessage(err),
                autoClose: 3000,
              });
            },
          }
        );
      },
    });
  };

  const columns: Array<DataTableColumn<Post>> = [
    {
      title: "#",
      render: (post) => (
        <Box className={classes.postIndex}>{posts.indexOf(post) + 1}</Box>
      ),
      accessor: "index",
    },
    {
      title: "Title",
      accessor: "title",
      render: (post) => (
        <Group className={classes.tableData}>
          <Image
            src={post.coverImage.base64url}
            alt="Cover Image"
            width={40}
            height={40}
            style={{ borderRadius: theme.radius.sm }}
          />
          <Text weight={500}>{post.title}</Text>
        </Group>
      ),
    },
    {
      title: "Posted On",
      accessor: "createdOn",
      render: (post) => (
        <Text className={classes.tableData}>
          {dayjs(post.createdAt).format("DD MMM YYYY")}
        </Text>
      ),
    },
    {
      title: "Category",
      render: (post) => (
        <Badge
          size="md"
          variant="filled"
          color={badgeColors[post.categories[0]] || "gray"}
        >
          {capitalize(post.categories[0])}
        </Badge>
      ),
      accessor: "category",
    },
    {
      title: "Actions",
      render: (post) => (
        <Group spacing={theme.spacing.xs / 4} className={classes.tableData}>
          <ActionIcon
            component={Link}
            href={`${router.pathname}/view/${post.id}`}
            aria-label="View"
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`${router.pathname}/edit/${post.id}`}
            aria-label="Edit"
          >
            <IconPencil />
          </ActionIcon>
          <ActionIcon onClick={() => onDeletePost(post.id)} aria-label="Delete">
            <IconTrash />
          </ActionIcon>
        </Group>
      ),
      accessor: "actions",
    },
  ];

  return (
    <Paper style={{ height: "100%" }} p="md" radius="md">
      <Stack align="stretch" style={{ height: "100%" }}>
        <Group position="apart">
          <Title weight={600} order={4}>
            Your Posts
          </Title>
          <Button
            href={`${router.pathname}/new`}
            component={Link}
            underline={false}
          >
            Create New
          </Button>
        </Group>
        <Divider />
        <DataTable
          columns={columns}
          records={posts}
          page={page}
          onPageChange={setPage}
          recordsPerPage={10}
          totalRecords={totalCount}
          verticalSpacing={theme.spacing.sm}
          fetching={isLoading}
        />
      </Stack>
    </Paper>
  );
};

export default withAuth(Posts);
