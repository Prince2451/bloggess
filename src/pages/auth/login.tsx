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
import { NextPage } from "next";
import Image from "next/legacy/image";
import Link from "../../components/navigation/link";
import Wrapper from "../../elements/auth/wrapper";
import CelebrationsIcon from "../../../public/assets/icons/celebration-user.svg";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { login } from "../../services/auth";
import { useAuthStore } from "../../stores";
import { showNotification } from "../../utils";
import { getErrorMessage } from "../../utils";
import { useRouter } from "next/router";

const schema = z.object({
  email: z.string().email({ message: "Valid email address is required" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

const Login: NextPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const setAuthDetails = useAuthStore((state) => state.setAuthDetails);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: typeof form.values) => {
    setIsLoggingIn(true);
    try {
      const { data } = await login(values);
      setAuthDetails({
        accessToken: data.token,
        refreshToken: data.refreshToken,
      });
      router.push("/posts");
    } catch (err: any) {
      showNotification({
        message: getErrorMessage(err),
        type: "danger",
      });
    }
    setIsLoggingIn(false);
  };

  return (
    <Wrapper
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
              <Checkbox label="Remember me" />
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
    </Wrapper>
  );
};

export default Login;
