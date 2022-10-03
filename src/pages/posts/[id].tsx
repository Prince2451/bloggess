import { createStyles } from "@mantine/core";
import { NextPage } from "next";
import React from "react";
import RichTextEditor from "../../components/RichTextEditor";

const useStyles = createStyles(() => ({
  textEditor: {
    height: "80vh",
  },
}));

const PostView: NextPage = () => {
  const { classes } = useStyles();
  return <RichTextEditor className={classes.textEditor} />;
};

export default PostView;
