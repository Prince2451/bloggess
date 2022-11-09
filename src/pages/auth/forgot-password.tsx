import React, { Fragment } from "react";
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
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import Layout from "../../elements/auth/layout";
import { NextPageWithLayout } from "../../types/utils";

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

const schema = z.object({
  email: z.string().email({ message: "Valid email address is required" }),
});

const ForgotPassword: NextPageWithLayout = () => {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });
  const { classes } = useStyles();

  return (
    <Fragment>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>
      <form onSubmit={form.onSubmit(() => void null)}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="you@email.com"
            withAsterisk
            {...form.getInputProps("email")}
          />
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
            <Button type="submit" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </form>
    </Fragment>
  );
};

ForgotPassword.getLayout = function (page) {
  return (
    <Layout
      title="Forgot password?"
      titleIcon={
        <Image width={40} height={40} src={SecurityIcon} alt="security" />
      }
    >
      {page}
    </Layout>
  );
};

export default ForgotPassword;
