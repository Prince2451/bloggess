import { Button, Center, Loader, Stack, Text } from "@mantine/core";
import { DynamicOptionsLoadingProps } from "next/dynamic";
import React from "react";

type IEditorLoadingProps = DynamicOptionsLoadingProps;

const EditorLoading: React.FC<IEditorLoadingProps> = ({
  isLoading,
  error,
  retry,
}) => {
  return (
    <Center p="md">
      {isLoading && <Loader />}
      {error && !isLoading && (
        <Stack align="center">
          <Text color="dimmed">
            We weren&apos;t able to fetch our text editor for you
          </Text>
          <Button onClick={retry} variant="subtle">
            Retry?
          </Button>
        </Stack>
      )}
    </Center>
  );
};

export default EditorLoading;
