import {
  createStyles,
  List,
  Navbar,
  Space,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import Link from "../../components/navigation/link";
import { useAuthStore } from "../../stores";
import { NAVBAR_WIDTH } from "../../utils";

const useStyles = createStyles((theme, _, getRef) => {
  const icon = getRef("icon");
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        textDecoration: "none",

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
      "&.active": {
        "&, &:hover": {
          backgroundColor: theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
          }).background,
          color: theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
          }).color,
          [`& .${icon}`]: {
            color: theme.fn.variant({
              variant: "filled",
              color: theme.primaryColor,
            }).color,
          },
        },
      },
    },
    listItem: {
      width: "100%",
      "& > .mantine-List-itemWrapper": {
        width: "100%",
      },
    },
    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
  };
});

interface AdminNavbarProps {
  links: Array<{ Icon: React.ElementType; link: string; title: string }>;
  isOpen: boolean;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ links, isOpen }) => {
  const { classes } = useStyles();
  const setAuthDetails = useAuthStore((state) => state.setAuthDetails);
  const queryClient = useQueryClient();

  const onLogout = () => {
    setAuthDetails(null);
    queryClient.clear();
  };

  return (
    <Navbar
      withBorder
      width={NAVBAR_WIDTH}
      hiddenBreakpoint="sm"
      hidden={!isOpen}
    >
      <Navbar.Section grow>
        <Space h="lg" />
        <List listStyleType="none" spacing={2} mx={2}>
          {links.map((link, i) => (
            <List.Item key={i} className={classes.listItem}>
              <Link
                className={classes.link}
                href={link.link}
                activeClassName="active"
              >
                <link.Icon className={classes.linkIcon} />
                <Text>{link.title}</Text>
              </Link>
            </List.Item>
          ))}
        </List>
      </Navbar.Section>
      <Navbar.Section>
        <UnstyledButton
          onClick={onLogout}
          sx={{ width: "100%" }}
          className={classes.link}
        >
          <IconLogout className={classes.linkIcon} />
          <Text>Logout</Text>
        </UnstyledButton>
        <Space h="xl" />
      </Navbar.Section>
    </Navbar>
  );
};

export default AdminNavbar;
