import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Button,
  Stack,
  Collapse,
  Box,
  createStyles,
  Space,
  useMantineTheme,
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
import { register } from "../../services/auth";
import { showNotification } from "@mantine/notifications";
import { getErrorMessage } from "../../utils";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  nameInputsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  nameInput: {
    width: "100%",
  },
}));

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
  firstName: z.string().trim().min(1, "Name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Valid email address is required"),
  password: z
    .string()
    .refine((value) => passRequirements(value).every((ele) => ele.meets), {
      message: "Strong password is required",
    }),
});

const Register: NextPage = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const theme = useMantineTheme();
  const router = useRouter();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: ["password"],
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: typeof form.values) => {
    setIsRegistering(true);
    try {
      await register(values);
      showNotification({
        title: "Success",
        message: "User created successfully",
        color: "green",
      });
      router.push("/auth/login");
    } catch (err: any) {
      showNotification({
        title: "Error",
        message: getErrorMessage(err),
        color: "red",
      });
    }
    setIsRegistering(false);
  };

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
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack spacing={theme.spacing.md}>
            <Box className={classes.nameInputsContainer}>
              <TextInput
                label="First Name"
                placeholder="Peter"
                withAsterisk
                className={classes.nameInput}
                {...form.getInputProps("firstName")}
              />
              <Space w={theme.spacing.sm} h={theme.spacing.md} />
              <TextInput
                label="Last Name"
                placeholder="Parker"
                className={classes.nameInput}
                {...form.getInputProps("lastName")}
              />
            </Box>
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
            <Collapse
              in={Boolean(form.errors.password && form.isTouched("password"))}
            >
              <PasswordStrength
                requirements={passRequirements(form.values.password)}
              />
            </Collapse>
            <Button loading={isRegistering} type="submit" fullWidth>
              Sign in
            </Button>
          </Stack>
        </Paper>
      </form>
    </Wrapper>
  );
};

export default Register;
