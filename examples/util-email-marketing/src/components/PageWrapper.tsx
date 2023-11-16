"use client";
import React from "react";
import { NavBar } from "@/src/components/NavBar";
import {
  ThemeProvider,
  defaultTheme,
  defaultDarkModeOverride,
  createTheme,
  View,
} from "@aws-amplify/ui-react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <ThemeProvider
      colorMode="light"
      theme={createTheme(
        {
          name: "my-theme",
          overrides: [defaultDarkModeOverride],
        },
        defaultTheme
      )}
    >
      <View>
        <NavBar />
        {children}
      </View>
    </ThemeProvider>
  );
};
