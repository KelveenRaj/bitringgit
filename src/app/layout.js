import { Box } from "@chakra-ui/react";
import Providers from "./providers";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "BitRinggit - Harga bitcoin dalam matawang ringgit",
  description: "Harga bitcoin dalam matawang ringgit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{ margin: 0, backgroundColor: "#111" }}
        suppressHydrationWarning
      >
        <Providers>
          <Box
            as="main"
            pb={8}
            maxW="36rem"
            marginLeft="auto"
            marginRight="auto"
          >
            <Navbar />
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
