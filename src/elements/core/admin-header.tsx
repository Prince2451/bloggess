import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Box,
  Burger,
  createStyles,
  Divider,
  Group,
  Header,
  Space,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoonStars, IconSearch, IconSun } from "@tabler/icons";
import React from "react";
import Link from "../../components/navigation/link";

const useStyles = createStyles((theme) => ({
  hideAtSm: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  titleContainer: {
    width: "var(--mantine-navbar-width)", // set by mantine
  },
  hamburger: {
    display: "none",
    [theme.fn.smallerThan("sm")]: {
      display: "block",
    },
  },
  search: {
    [theme.fn.largerThan("sm")]: {
      maxWidth: 500,
    },
  },
  profile: {
    display: "flex",
    background: theme.fn.variant({ variant: "filled" }).background,
    borderRadius: theme.radius.md,
    color: theme.fn.variant({ variant: "filled" }).color,
    alignItems: "center",
    height: "100%",
    padding: `0 ${theme.spacing.sm}px`,
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

interface AdminHeaderProps {
  onToggle: () => void;
  isOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggle, isOpen }) => {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={75}>
      <Group
        sx={{ height: "100%" }}
        align="center"
        spacing="lg"
        position="apart"
        px="md"
        py="xs"
      >
        <Box className={cx(classes.hideAtSm, classes.titleContainer)}>
          <Title order={3}>Blogges</Title>
        </Box>
        <Burger
          opened={isOpen}
          onClick={onToggle}
          size="sm"
          color={theme.colors.gray[6]}
          className={classes.hamburger}
        />
        <Group sx={{ flexGrow: 1, alignSelf: "stretch" }} position="apart">
          {/* for mainting center of searchbar */}
          <Space></Space>
          <Autocomplete
            data={[]}
            sx={{ flexGrow: 1 }}
            rightSection={<IconSearch size={18} opacity={0.3} />}
            className={classes.search}
          />
          <Group style={{ alignSelf: "stretch" }}>
            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              variant="subtle"
              aria-label="Toggle Theme"
            >
              {colorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoonStars size={18} />
              )}
            </ActionIcon>
            <Divider className={classes.hideAtSm} orientation="vertical" />
            <Link className={classes.profile} href="">
              <Text className={classes.hideAtSm} size="sm" weight={500}>
                Prince Verma
              </Text>
              <Avatar variant="filled" color="inherit" />
            </Link>
          </Group>
        </Group>
      </Group>
    </Header>
  );
};

export default AdminHeader;
