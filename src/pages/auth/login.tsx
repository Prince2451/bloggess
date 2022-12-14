import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Text,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import Image from "next/legacy/image";
import Link from "../../components/navigation/link";
import CelebrationsIcon from "../../../public/assets/icons/celebration-user.svg";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { login } from "../../services/auth";
import { useAuthStore } from "../../stores";
import { showNotification } from "../../utils/helpers/notifications";
import { getErrorMessage } from "../../utils/helpers/axios";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../types/utils";
import Layout from "../../elements/auth/layout";

const schema = z.object({
  email: z.string().email({ message: "Valid email address is required" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

const Login: NextPageWithLayout = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const setAuthStore = useAuthStore((state) => state.setAuthStore);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: typeof form.values) => {
    setIsLoggingIn(true);
    try {
      const { data } = await login(values);
      setAuthStore({
        authDetails: {
          accessToken: data.token,
          refreshToken: data.refreshToken,
        },
        remember: values.rememberMe,
      });
      router.push("/posts");
    } catch (err) {
      showNotification({
        message: getErrorMessage(err),
        type: "danger",
      });
    }
    setIsLoggingIn(false);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="register" size="sm">
          Create account
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <TextInput
            label="Email"
            placeholder="you@email.com"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <Group position="apart">
            <Checkbox
              label="Remember me"
              {...form.getInputProps("rememberMe", { type: "checkbox" })}
            />
            <Link href="forgot-password" size="sm">
              Forgot password?
            </Link>
          </Group>
          <Button loading={isLoggingIn} type="submit" fullWidth>
            Sign in
          </Button>
        </Stack>
      </Paper>
    </form>
  );
};

Login.getLayout = function (page) {
  return (
    <Layout
      title="Welcome Back!"
      titleIcon={
        <Image
          width={50}
          height={50}
          src={CelebrationsIcon}
          alt="celebration"
        />
      }
    >
      {page}
    </Layout>
  );
};

export default Login;
