import {
  Autocomplete,
  Avatar,
  Burger,
  createStyles,
  Divider,
  Group,
  Header,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme) => ({
  userAvatar: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
  hamburger: {
    display: "none",
    [theme.fn.smallerThan("xs")]: {
      display: "block",
    },
  },
}));

interface AdminHeaderProps {
  onToggle: () => void;
  isOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggle, isOpen }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Header height={75}>
      <Group
        sx={{ height: "100%" }}
        align="center"
        spacing="lg"
        px="md"
        py="xs"
      >
        <Burger
          opened={isOpen}
          onClick={onToggle}
          size="sm"
          color={theme.colors.gray[6]}
          className={classes.hamburger}
        />
        <Autocomplete
          sx={{ flexGrow: 1 }}
          data={[]}
          rightSection={<IconSearch opacity={0.3} />}
        />
        <Group className={classes.userAvatar}>
          <Divider orientation="vertical" />
          <Text size="sm" weight={500}>
            Prince Verma
          </Text>
          <Avatar />
        </Group>
      </Group>
    </Header>
  );
};

export default AdminHeader;
