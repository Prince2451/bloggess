import {
  BackgroundImage,
  createStyles,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import Dropzone from "../../../components/Dropzone";
import RichTextEditor from "../../../components/RichTextEditor";
import withAuth from "../../../hoc/withAuth";
import { NextPageWithLayout } from "../../../types/utils";
import { fileToBase64, showNotification } from "../../../utils";

interface UseStylesParams {
  hasImage: boolean;
}

const useStyles = createStyles((theme, params: UseStylesParams) => ({
  postsInputsContainer: {
    width: "100%",
    height: "100%",
  },
  metaInputsContainer: {
    flexWrap: "nowrap",
    [theme.fn.smallerThan("md")]: {
      flexWrap: "wrap",
    },
  },
  backgroundImage: {
    [theme.fn.largerThan("md")]: {
      width: "33% !important",
    },
  },
  dropzone: {
    background: params.hasImage ? "transparent" : undefined,
    "& .dropzone-inner-group": {
      minHeight: "10rem",
      [theme.fn.smallerThan("md")]: {
        minHeight: "6rem",
      },
    },
    "&:hover": {
      opacity: params.hasImage ? 0.75 : 1,
    },
    "&[data-idle] .dropzone-inner-group": {
      opacity: params.hasImage ? 0 : 1,
    },
    "&[data-idle]:hover .dropzone-inner-group": {
      opacity: 1,
    },
  },
  metaInputs: {
    width: "64%",
    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  postEditor: {
    flexGrow: 1,
    minHeight: "25rem",
    maxHeight: "35rem",
  },
}));

const PostEdit: NextPageWithLayout = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { classes } = useStyles({
    hasImage: !!selectedFile,
  });

  const onDrop = async (files: FileWithPath[]) => {
    try {
      const url = await fileToBase64(files[0]);
      setSelectedFile(url);
    } catch (err) {
      showNotification({
        message: "Cannot process image",
        type: "danger",
      });
    }
  };

  return (
    <Paper radius="md" p="md" style={{ height: "100%" }}>
      <Stack className={classes.postsInputsContainer} align="stretch">
        <Group className={classes.metaInputsContainer} align="flex-start">
          <BackgroundImage
            src={selectedFile || ""}
            className={classes.backgroundImage}
          >
            <Dropzone
              title="Cover Image"
              subTitle={`Click or Drop Image to upload allowed (png, jpeg, svg, webp)`}
              onDrop={onDrop}
              className={classes.dropzone}
              accept={[
                MIME_TYPES.png,
                MIME_TYPES.jpeg,
                MIME_TYPES.svg,
                MIME_TYPES.webp,
              ]}
              maxFiles={1}
              color="dark"
            />
          </BackgroundImage>
          {/* <BackgroundImage src={selectedFile || ""}></BackgroundImage> */}
          <Stack className={classes.metaInputs}>
            <TextInput
              label="Post Title"
              placeholder="How to date on social media"
              withAsterisk
            />
            <Textarea
              label="Description"
              placeholder="My story of being dumbed on socail media"
              autosize
              minRows={3}
              maxRows={4}
              withAsterisk
            />
          </Stack>
        </Group>
        <RichTextEditor className={classes.postEditor} />
      </Stack>
    </Paper>
  );
};

export default withAuth(PostEdit);
