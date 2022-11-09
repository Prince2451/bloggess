import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NotificationType =
  | "default"
  | "success"
  | "danger"
  | "info"
  | "warning";

export type Layout = "admin";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: Layout;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
