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
import { useEffect, useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const passRequirements = (value: string) => {
  const requirements = [
    {
      meets: value.length > 6,
      label: "Includes at least 6 characters",
    },
    { meets: /[0-9]/.test(value), label: "Includes number" },
    {
      meets: /[a-z]/.test(value),
      label: "Includes lowercase letter",
    },
    {
      meets: /[A-Z]/.test(value),
      label: "Includes uppercase letter",
    },
    {
      meets: /[$&+,:;=?@#|'<>.^*()%!-]/.test(value),
      label: "Includes special symbol",
    },
  ];
  return requirements;
};

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Valid email address is required"),
  password: z
    .string()
    .refine((value) => passRequirements(value).every((ele) => ele.meets), {
      message: "Strong password is required",
    }),
});

const Register: NextPage = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    if (form.errors.password && form.isTouched("password") && !popoverOpened) {
      setPopoverOpened(true);
    } else if (!form.errors.password && popoverOpened) {
      setPopoverOpened(false);
    }
  }, [form, popoverOpened]);

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
      <form onSubmit={form.onSubmit(() => void null)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <TextInput
              label="Name"
              placeholder="Peter Parker"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="you@email.com"
              required
              {...form.getInputProps("email")}
            />
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
                  {...form.getInputProps("password")}
                />
              </Popover.Target>
              <Popover.Dropdown>
                <PasswordStrength
                  requirements={passRequirements(form.values.password)}
                />
              </Popover.Dropdown>
            </Popover>

            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </Paper>
      </form>
    </Wrapper>
  );
};

export default Register;
