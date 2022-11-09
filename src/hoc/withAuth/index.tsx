import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUser } from "../../query/auth";
import { useAuthStore } from "../../stores";
import { Layout, NextPageWithLayout } from "../../types/utils";

interface WithAuthOptions {
  layout?: Layout;
}

const withAuth = (
  WrappedComponent: NextPageWithLayout,
  options: WithAuthOptions = { layout: "admin" }
) => {
  const HocComponent: NextPageWithLayout = (props) => {
    const router = useRouter();
    const authDetails = useAuthStore((state) => state.authDetails);
    const { isAuthenticated, isLoading: isAuthenticating } = useUser({
      enabled: !!authDetails,
    });

    useEffect(() => {
      if (!isAuthenticating && !isAuthenticated) {
        router.push("/auth/login");
      }
    }, [isAuthenticated, isAuthenticating, router]);

    if (isAuthenticating) return null; /* add loader here */
    return (
      <WrappedComponent
        {...props}
        layout={isAuthenticated ? options.layout : undefined}
      />
    );
  };

  HocComponent.layout = options.layout;
  HocComponent.getLayout = WrappedComponent.getLayout;
  HocComponent.getInitialProps = WrappedComponent.getInitialProps;

  return HocComponent;
};

export default withAuth;
