import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import AdminHeader from "../elements/core/admin-header";
import { useDisclosure, useToggle } from "@mantine/hooks";
import AdminNavbar from "../elements/core/admin-navbar";
import { IconHome, IconNews } from "@tabler/icons";
import { mantineTheme } from "../utils";
import GlobalStyles from "../components/global-styles";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [isOpen, handlers] = useDisclosure(false);
  const [colorScheme, toggleColorScheme] = useToggle([
    "light",
    "dark",
  ] as const);

  const links = [
    {
      title: "Posts",
      Icon: IconNews,
      link: "/posts",
    },
    {
      title: "Dashboard",
      Icon: IconHome,
      link: "/dashboard",
    },
    {
      title: "Dashboard",
      Icon: IconHome,
      link: "/dashboard",
    },
  ];

  return (
    <>
      <Head>
        <title>Page title</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
            ...mantineTheme,
          }}
        >
          {/* for global styles */}
          <GlobalStyles />
          <AppShell
            header={<AdminHeader isOpen={isOpen} onToggle={handlers.toggle} />}
            navbar={<AdminNavbar isOpen={isOpen} links={links} />}
            navbarOffsetBreakpoint="sm"
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
