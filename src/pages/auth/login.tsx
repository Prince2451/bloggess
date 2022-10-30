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

const Login: NextPage = () => {
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
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href="register" size="sm">
          Create account
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <TextInput label="Email" placeholder="you@email.com" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
          />
          <Group position="apart">
            <Checkbox label="Remember me" />
            <Link href="forgot-password" size="sm">
              Forgot password?
            </Link>
          </Group>
          <Button fullWidth>Sign in</Button>
        </Stack>
      </Paper>
    </Wrapper>
  );
};

export default Login;
