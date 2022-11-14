import { Paper } from "@mantine/core";
import React, { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper radius="md" px="md" pt="md" style={{ height: "100%" }}>
      {children}
    </Paper>
  );
};

export default Layout;
