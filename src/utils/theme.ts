import { MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  fontFamily:
    "Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  headings: {
    fontFamily:
      "Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  },
  cursorType: "pointer",
  components: {
    AppShell: {
      styles(theme) {
        return {
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[9]
                : theme.colors.gray[1],
          },
        };
      },
    },
    MultiSelect: {
      styles(theme) {
        return {
          value: {
            ...theme.fn.variant({ variant: "filled" }),
          },
          defaultValueRemove: {
            color: "inherit",
          },
        };
      },
    },
  },
  primaryColor: "pink",
};

export { mantineTheme };
