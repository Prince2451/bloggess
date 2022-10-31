import { Box, Container, Progress, Text, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";

interface PasswordRequirementProps {
  meets: boolean;
  label: string;
}

interface PasswordStrengthProps {
  requirements: Array<{
    label: string;
    meets: boolean;
  }>;
}
const PasswordRequirement: React.FC<PasswordRequirementProps> = ({
  meets,
  label,
}) => {
  const theme = useMantineTheme();
  return (
    <Text
      color={meets ? theme.colors.green[4] : theme.colors.red[4]}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
};

function getStrength(requirements: PasswordStrengthProps["requirements"]) {
  let multiplier = 0;

  requirements.forEach((requirement) => {
    if (requirement.meets) {
      multiplier += 1;
    }
  });

  return Math.max((100 / requirements.length) * multiplier, 10);
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  requirements,
}) => {
  const theme = useMantineTheme();
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.meets}
    />
  ));
  const strength = getStrength(requirements);
  const color =
    strength === 100
      ? theme.colors.green[4]
      : strength > 50
      ? theme.colors.yellow[4]
      : theme.colors.red[4];

  return (
    <Container fluid>
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />
      {checks}
    </Container>
  );
};

export default PasswordStrength;
