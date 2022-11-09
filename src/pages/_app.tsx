import { AppProps } from "next/app";
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

export default function App(props: AppProps<{ layout?: "admin" }>) {
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
            <NotificationsProvider>
              {/* for global styles */}
              <GlobalStyles />
              <AppShell
                header={
                  pageProps.layout === "admin" ? (
                    <AdminHeader isOpen={isOpen} onToggle={handlers.toggle} />
                  ) : (
                    <></>
                  )
                }
                navbar={
                  pageProps.layout === "admin" ? (
                    <AdminNavbar isOpen={isOpen} links={links} />
                  ) : (
                    <></>
                  )
                }
                navbarOffsetBreakpoint="sm"
              >
                <Container size="sm" style={{ height: "100%" }}>
                  <Component {...pageProps} />
                </Container>
              </AppShell>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}
