import { DataTable, DataTableColumn } from "mantine-datatable";
import { NextPage } from "next";
import React, { useState } from "react";
import { Post } from "../../types/elements/auth";
import { Badge, BadgeProps } from "@mantine/core";
import { capitalize } from "lodash";
import { useRouter } from "next/router";

const Posts: NextPage = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const posts: Array<Post> = [
    {
      category: "nature",
      coverImage: "",
      createdOn: "2022-09-12T12:33.22",
      id: 2,
      slug: "nature-2",
      title: "How to worl",
    },
    {
      category: "engineering",
      coverImage: "",
      createdOn: "2022-09-12T12:33.22",
      id: 2,
      slug: "nature-2",
      title: "How to worl",
    },
    {
      category: "nature",
      coverImage: "",
      createdOn: "2022-09-12T12:33.22",
      id: 2,
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
      render: (post) => posts.indexOf(post) + 1,
      accessor: "index",
    },
    {
      title: "Title",
      accessor: "title",
    },
    {
      title: "Category",
      render: (post) => (
        <Badge color={badgeColors[post.category] || "gray"}>
          {capitalize(post.category)}
        </Badge>
      ),
      accessor: "category",
    },
    {
      title: "Posted On",
      accessor: "createdOn",
    },
  ];

  return (
    <DataTable
      columns={columns}
      records={posts.concat(posts, posts, posts, posts, posts)}
      striped
      highlightOnHover
      page={page}
      onPageChange={setPage}
      recordsPerPage={10}
      totalRecords={posts.length}
      minHeight={10}
      onRowClick={(post) => router.push(post.slug)}
    />
  );
};

export default Posts;
