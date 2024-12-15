import { Box, Flex } from "@chakra-ui/react";
import Providers from "./providers";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "BitRinggit - Harga bitcoin dalam matawang ringgit",
  description: "Harga bitcoin dalam matawang ringgit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0 }} suppressHydrationWarning>
        <Providers>
          <Flex direction="column" h="100vh" overflow="hidden">
            <Box flex="0 0 10vh">
              <Navbar />
            </Box>
            <Box flex="1" overflowY="auto">
              {children}
            </Box>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
