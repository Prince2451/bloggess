import { NextPage } from "next";
import React from "react";
import Wrapper from "../../elements/auth/wrapper";
import {
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  Center,
  Box,
  createStyles,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import SecurityIcon from "../../../public/assets/icons/security.svg";
import Image from "next/legacy/image";
import Link from "../../components/navigation/link";

const useStyles = createStyles((theme) => ({
  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

const ForgotPassword: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Wrapper
      title="Forgot password?"
      titleIcon={
        <Image width={40} height={40} src={SecurityIcon} alt="security" />
      }
    >
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="you@email.com" required />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Link
            href="login"
            color="dimmed"
            size="sm"
            className={classes.control}
          >
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Back to login page</Box>
            </Center>
          </Link>
          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Wrapper>
  );
};

export default ForgotPassword;
