"use client";

import { Box, Text, Heading, Link, Stack } from "@chakra-ui/react";

const CardInfo = ({ title, description, linkText, link }) => {
  return (
    <Box
      borderRadius="lg"
      p={3}
      align="center"
      boxSize="auto"
      color="white"
      bg="#1b1b1b"
      textAlign="center"
      boxShadow="lg"
      mt={6}
    >
      <Stack spacing={4}>
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm" textAlign="justify" p="10px">
          {description}
        </Text>
        <Link
          href={link}
          isExternal
          color="teal.300"
          fontWeight="bold"
          fontSize="sm"
          pt="15px"
        >
          {linkText}
        </Link>
      </Stack>
    </Box>
  );
};

export default CardInfo;
