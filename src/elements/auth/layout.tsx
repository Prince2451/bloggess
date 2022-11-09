import { Center, Container, Title } from "@mantine/core";
import React, { PropsWithChildren } from "react";

interface LayoutProps {
  title: string;
  titleIcon: React.ReactElement;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  title,
  titleIcon,
  children,
}) => {
  return (
    <Center p={0} sx={{ height: "100%" }}>
      <Container my={40} size={420} sx={{ flexGrow: 1 }}>
        <Title align="center" order={1}>
          {title} {titleIcon}
        </Title>
        {children}
      </Container>
    </Center>
  );
};

export default Layout;
