import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Button,
  Stack,
  Popover,
} from "@mantine/core";
import { NextPage } from "next";
import Image from "next/legacy/image";
import Link from "../../components/navigation/link";
import Wrapper from "../../elements/auth/wrapper";
import CelebrationsIcon from "../../../public/assets/icons/celebration.svg";
import PasswordStrength from "../../elements/auth/password-strength";
import { useState } from "react";

const Register: NextPage = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const value = "s1U@!2322";
  const requirements = [
    { meets: value.length > 6, label: "Includes at least 6 characters" },
    { meets: /[0-9]/.test(value), label: "Includes number" },
    { meets: /[a-z]/.test(value), label: "Includes lowercase letter" },
    { meets: /[A-Z]/.test(value), label: "Includes uppercase letter" },
    {
      meets: /[$&+,:;=?@#|'<>.^*()%!-]/.test(value),
      label: "Includes special symbol",
    },
  ];

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
          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transition="pop"
          >
            <Popover.Target>
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                onFocus={() => setPopoverOpened(true)}
                onBlur={() => setPopoverOpened(false)}
              />
            </Popover.Target>
            <Popover.Dropdown>
              <PasswordStrength requirements={requirements} />
            </Popover.Dropdown>
          </Popover>

          <Button fullWidth>Sign in</Button>
        </Stack>
      </Paper>
    </Wrapper>
  );
};

export default Register;
