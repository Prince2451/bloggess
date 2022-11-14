import React from "react";
import {
  BackgroundImage,
  Button,
  createStyles,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import Dropzone from "../../components/Dropzone";
import RichTextEditor from "../../components/RichTextEditor";
import { fileToBase64, showNotification } from "../../utils";
import { PostFormFields } from "../../types/elements/posts";
import { UseFormInput } from "@mantine/form/lib/types";

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
  actionsContainer: {
    position: "sticky",
    bottom: 0,
    zIndex: 10,
  },
  actionButtons: {
    justifyContent: "right",
    [theme.fn.smallerThan("sm")]: {
      justifyContent: "center",
    },
  },
}));

type PostFormProps = UseFormInput<PostFormFields>;
const PostForm: React.FC<PostFormProps> = (props) => {
  const form = useForm<PostFormFields>({
    initialValues: {
      title: "",
      description: "",
      coverImage: {
        value: null,
        url: "",
      },
      content: "",
    },
    validateInputOnBlur: true,
    ...props,
  });
  const { classes } = useStyles({
    hasImage: !!form.values.coverImage.url,
  });

  const onDrop = async (files: FileWithPath[]) => {
    try {
      const url = await fileToBase64(files[0]);

      form.setFieldValue("coverImage", {
        url,
        value: files[0],
      });
    } catch (err) {
      showNotification({
        message: "Cannot process image",
        type: "danger",
      });
    }
  };

  const onSubmit = () => null;
  return (
    <form style={{ height: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
      <Stack className={classes.postsInputsContainer} align="stretch">
        <Group className={classes.metaInputsContainer} align="flex-start">
          <BackgroundImage
            src={form.values.coverImage.url}
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
          <Stack className={classes.metaInputs}>
            <TextInput
              label="Post Title"
              placeholder="How to date on social media"
              withAsterisk
              name="title"
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              placeholder="My story of being dumbed on socail media"
              autosize
              minRows={3}
              maxRows={4}
              withAsterisk
              name="description"
              {...form.getInputProps("description")}
            />
          </Stack>
        </Group>
        <RichTextEditor className={classes.postEditor} />
        <Paper radius={0} py="md" className={classes.actionsContainer}>
          <Group className={classes.actionButtons}>
            <Button variant="light" type="button">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </Paper>
      </Stack>
    </form>
  );
};

export default PostForm;
