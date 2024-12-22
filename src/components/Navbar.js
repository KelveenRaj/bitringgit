"use client";

import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { useLanguage } from "@context/LanguageContext";

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Box
      bg="#111"
      p="1rem 1.5rem"
      position="sticky"
      top="0"
      zIndex={10}
      h="100%"
    >
      <Flex
        align="center"
        justify="space-between"
        direction={{ base: "row", md: "row" }}
      >
        <HStack spacing={8} justify="flex-start">
          <Text fontSize="2xl" fontWeight="bold" color="white" cursor="pointer">
            BitRinggit
          </Text>
        </HStack>

        <Button onClick={toggleLanguage} variant="link" color="white">
          {language === "bm" ? "English" : "BM"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
