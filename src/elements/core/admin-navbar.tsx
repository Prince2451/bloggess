import {
  createStyles,
  List,
  Navbar,
  Space,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import React from "react";
import Link from "../../components/navigation/link";

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
            variant: "light",
            color: theme.primaryColor,
          }).background,
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
          [`& .${icon}`]: {
            color: theme.fn.variant({
              variant: "light",
              color: theme.primaryColor,
            }).color,
          },
        },
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

  return (
    <Navbar
      withBorder
      width={{
        sm: 200,
        lg: 300,
      }}
      hiddenBreakpoint="sm"
      hidden={!isOpen}
    >
      <Navbar.Section grow>
        <Space h="lg" />
        <List listStyleType="none" spacing={2}>
          {links.map((link, i) => (
            <List.Item key={i}>
              <Link
                className={classes.link}
                href={link.link}
                activeClassName="active"
                isExact
              >
                <link.Icon className={classes.linkIcon} />
                <Text>{link.title}</Text>
              </Link>
            </List.Item>
          ))}
        </List>
      </Navbar.Section>
      <Navbar.Section>
        <UnstyledButton sx={{ width: "100%" }} className={classes.link}>
          <IconLogout className={classes.linkIcon} />
          <Text>Logout</Text>
        </UnstyledButton>
        <Space h="xl" />
      </Navbar.Section>
    </Navbar>
  );
};

export default AdminNavbar;
