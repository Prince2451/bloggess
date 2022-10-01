import { Center, Container, Title } from "@mantine/core";
import React, { PropsWithChildren } from "react";

interface WrapperProps {
  title: string;
  titleIcon: React.ReactElement;
}

const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
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

export default Wrapper;
