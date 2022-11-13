import React from "react";
import {
  Dropzone as MantineDropzone,
  DropzoneProps as MantineDropzoneProps,
} from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";
import { Box, createStyles, Group, Text, useMantineTheme } from "@mantine/core";

const useStyles = createStyles(() => ({
  dropzone: {
    "& .mantine-Dropzone-inner": {
      height: "100%",
    },
  },
}));

interface DropzoneProps extends Omit<MantineDropzoneProps, "children"> {
  title: string;
  subTitle?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ title, subTitle, ...props }) => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <MantineDropzone
      {...props}
      className={cx(props.className, classes.dropzone)}
    >
      <Group
        position="center"
        spacing="xl"
        style={{ pointerEvents: "none" }}
        className="dropzone-inner-group"
      >
        <MantineDropzone.Accept>
          <IconUpload
            size={50}
            stroke={1.5}
            color={
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ]
            }
          />
        </MantineDropzone.Accept>
        <MantineDropzone.Reject>
          <IconX
            size={50}
            stroke={1.5}
            color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
          />
        </MantineDropzone.Reject>
        <MantineDropzone.Idle>
          <IconPhoto size={50} stroke={1.5} color={theme.colors.gray[6]} />
        </MantineDropzone.Idle>

        <Box style={{ textAlign: "center" }}>
          <Text size="xl" inline>
            {title}
          </Text>
          {subTitle && (
            <Text size="sm" color="dimmed" inline mt={7}>
              {subTitle}
            </Text>
          )}
        </Box>
      </Group>
    </MantineDropzone>
  );
};

export default Dropzone;
