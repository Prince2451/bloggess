import React from "react";
import NextLink from "next/link";
import { Anchor, AnchorProps } from "@mantine/core";
import type { PolymorphicComponentProps } from "@mantine/utils";

interface LinkProps extends PolymorphicComponentProps<"a", AnchorProps> {
  href: string;
}

const Link: React.FC<LinkProps> = ({ href, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Anchor {...props}></Anchor>
    </NextLink>
  );
};

export default Link;
