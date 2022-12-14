import Head from "next/head";
import {
  AppShell,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from "@mantine/core";
import AdminHeader from "../elements/core/admin-header";
import { useDisclosure, useToggle } from "@mantine/hooks";
import AdminNavbar from "../elements/core/admin-navbar";
import { IconHome, IconNews } from "@tabler/icons";
import { mantineTheme } from "../utils";
import GlobalStyles from "../components/global-styles";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppPropsWithLayout } from "../types/utils";
import { ModalsProvider } from "@mantine/modals";

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;

  const [isOpen, handlers] = useDisclosure(false);
  const [colorScheme, toggleColorScheme] = useToggle([
    "light",
    "dark",
  ] as const);

  if (!Component.getLayout) Component.getLayout = (page) => page;

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
      <QueryClientProvider client={new QueryClient()}>
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
            <ModalsProvider>
              <NotificationsProvider>
                {/* for global styles */}
                <GlobalStyles />
                <AppShell
                  header={
                    Component.layout === "admin" ? (
                      <AdminHeader isOpen={isOpen} onToggle={handlers.toggle} />
                    ) : (
                      <></>
                    )
                  }
                  navbar={
                    Component.layout === "admin" ? (
                      <AdminNavbar isOpen={isOpen} links={links} />
                    ) : (
                      <></>
                    )
                  }
                  navbarOffsetBreakpoint="sm"
                >
                  <Container size="md" style={{ height: "100%" }}>
                    {Component.getLayout(<Component {...pageProps} />)}
                  </Container>
                </AppShell>
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
