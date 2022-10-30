import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Button,
  Stack,
} from "@mantine/core";
import { NextPage } from "next";
import Image from "next/legacy/image";
import Link from "../../components/navigation/link";
import Wrapper from "../../elements/auth/wrapper";
import CelebrationsIcon from "../../../public/assets/icons/celebration.svg";

const Register: NextPage = () => {
  return (
    <Wrapper
      title="Welcome Creator!"
      titleIcon={<Image src={CelebrationsIcon} alt="celebration" />}
    >
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Link href="login" size="sm">
          Login
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <TextInput label="Name" placeholder="Peter Parker" required />
          <TextInput label="Email" placeholder="you@email.com" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
          />
          <Button fullWidth>Sign in</Button>
        </Stack>
      </Paper>
    </Wrapper>
  );
};

export default Register;
