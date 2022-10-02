import React from "react";
import NextLink from "next/link";
import { Anchor, AnchorProps, clsx } from "@mantine/core";
import type { PolymorphicComponentProps } from "@mantine/utils";
import { useRouter } from "next/router";

interface LinkProps extends PolymorphicComponentProps<"a", AnchorProps> {
  href: string;
  activeClassName?: string;
  isExact?: boolean;
}

const Link: React.FC<LinkProps> = ({
  href,
  className,
  activeClassName = "",
  isExact = false,
  ...props
}) => {
  const router = useRouter();

  return (
    <NextLink href={href} passHref>
      <Anchor
        className={clsx(className, {
          [activeClassName]: isExact
            ? router.pathname === href
            : router.pathname.startsWith(href),
        })}
        {...props}
      ></Anchor>
    </NextLink>
  );
};

export default Link;
