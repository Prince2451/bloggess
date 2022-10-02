import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import AdminNavbar from "../elements/core/admin-header";
import { useDisclosure } from "@mantine/hooks";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [isOpen, handlers] = useDisclosure(false);

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

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <AppShell
          navbar={<AdminNavbar isOpen={isOpen} onToggle={handlers.toggle} />}
        >
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}
