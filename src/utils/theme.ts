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
                ? theme.colors.dark[8]
                : theme.colors.gray[1],
          },
        };
      },
    },
  },
};

export { mantineTheme };
