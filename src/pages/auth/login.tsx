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

const schema = z.object({
  email: z.string().email({ message: "Valid email address is required" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});

const Login: NextPage = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

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
      <form onSubmit={form.onSubmit(() => void null)}>
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
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </Paper>
      </form>
    </Wrapper>
  );
};

export default Login;
