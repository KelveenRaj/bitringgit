"use client";

import { ThemeProvider } from "next-themes";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { LanguageProvider } from "@context/LanguageContext";

export default function RootLayout({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
