import { DataTable, DataTableColumn } from "mantine-datatable";
import React, { useState } from "react";
import { Post } from "../../types/elements/auth";
import {
  ActionIcon,
  Badge,
  BadgeProps,
  Box,
  createStyles,
  Group,
  Paper,
  Text,
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

  const posts: Array<Post> = [
    {
      category: "nature",
      coverImage: "https://source.unsplash.com/random/",
      createdOn: "2022-09-12T12:33.22",
      id: 1,
      slug: "nature-2",
      title: "How to worl",
    },
    {
      category: "engineering",
      coverImage: "https://source.unsplash.com/random/",
      createdOn: "2022-09-12T12:33.22",
      id: 2,
      slug: "nature-2",
      title: "How to worl",
    },
    {
      category: "nature",
      coverImage: "https://source.unsplash.com/random/",
      createdOn: "2022-09-12T12:33.22",
      id: 3,
      slug: "nature-2",
      title: "How to worl",
    },
  ];

  const badgeColors: Record<string, BadgeProps["color"]> = {
    nature: "green",
    engineering: "blue",
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
            src={post.coverImage + "?" + post.category}
            alt="Cover Image"
            width={40}
            height={40}
            style={{ borderRadius: theme.radius.sm }}
          />
          <Text>{post.title}</Text>
        </Group>
      ),
    },
    {
      title: "Posted On",
      accessor: "createdOn",
      render: (post) => (
        <Text className={classes.tableData}>
          {dayjs(post.createdOn).format("DD MMM YYYY")}
        </Text>
      ),
    },
    {
      title: "Category",
      render: (post) => (
        <Badge
          size="md"
          variant="filled"
          color={badgeColors[post.category] || "gray"}
        >
          {capitalize(post.category)}
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
            href={`${router.pathname}/view/${post.slug}`}
            aria-label="View"
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`${router.pathname}/edit/${post.slug}`}
            aria-label="Edit"
          >
            <IconPencil />
          </ActionIcon>
          <ActionIcon aria-label="Delete">
            <IconTrash />
          </ActionIcon>
        </Group>
      ),
      accessor: "actions",
    },
  ];

  return (
    <Paper
      style={{ height: "100%" }}
      p={theme.spacing.md}
      radius={theme.radius.md}
    >
      <DataTable
        columns={columns}
        records={posts}
        page={page}
        onPageChange={setPage}
        recordsPerPage={10}
        totalRecords={posts.length}
        verticalSpacing={theme.spacing.sm}
      />
    </Paper>
  );
};

export default withAuth(Posts);
