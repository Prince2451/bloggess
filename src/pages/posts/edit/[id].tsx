import {
  createStyles,
  Group,
  Paper,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import Dropzone from "../../../components/Dropzone";
import RichTextEditor from "../../../components/RichTextEditor";
import withAuth from "../../../hoc/withAuth";
import { NextPageWithLayout } from "../../../types/utils";

const useStyles = createStyles((theme) => ({
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
  dropzone: {
    width: "33%",
    "& .dropzone-inner-group": {
      minHeight: "10rem",
      [theme.fn.smallerThan("md")]: {
        minHeight: "6rem",
      },
    },
    [theme.fn.smallerThan("md")]: {
      width: "100%",
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
  const { classes } = useStyles();

  return (
    <Paper radius="md" p="md" style={{ height: "100%" }}>
      <Stack className={classes.postsInputsContainer} align="stretch">
        <Group className={classes.metaInputsContainer} align="flex-start">
          <Dropzone
            title="Cover Image"
            subTitle="Click or Drop Image to upload"
            onDrop={() => null}
            className={classes.dropzone}
          />
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
