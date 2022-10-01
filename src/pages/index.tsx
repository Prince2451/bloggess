import {
  Button,
  Center,
  CheckIcon,
  Group,
  useMantineTheme,
} from "@mantine/core";

export default function IndexPage() {
  const theme = useMantineTheme();
  return (
    <Center>
      <Group mt={50}>
        <Button size="xl">Welcome to Mantine!</Button>
      </Group>
      <CheckIcon height="xl" fontSize={theme.fontSizes.md} />
    </Center>
  );
}
