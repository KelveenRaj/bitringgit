"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Text, Heading, Spinner, Flex } from "@chakra-ui/react";
import { useLanguage } from "@context/LanguageContext";

const Home = () => {
  const { language } = useLanguage();
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=myr`
        );
        const data = await response.json();
        setConversionRate(data?.usd?.myr || 1);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConversionRate(1);
      }
    };

    fetchConversionRate();
  }, []);

  useEffect(() => {
    if (conversionRate === null) return;

    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      const formattedPrice = (parseFloat(data.p) * conversionRate).toFixed(2);
      setPrice(new Intl.NumberFormat().format(formattedPrice));
      setLoading(false);
    };

    return () => socket.close();
  }, [conversionRate]);

  return (
    <Flex bg="#111" color="white" h="100%" justify="center" align="center">
      <Box
        w={{ base: "90%", sm: "80%", md: "450px", lg: "500px" }}
        p={6}
        borderRadius="md"
        bg="#1b1b1b"
        textAlign="center"
        boxShadow="lg"
      >
        <Flex
          direction="row"
          align="center"
          justifyContent="center"
          padding="15px 0"
        >
          <Image
            src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
            alt="Bitcoin Logo"
            width={50}
            height={50}
            style={{ marginRight: "10px" }}
            priority
          />
          <Heading size="xl">
            {language === "bm"
              ? "Harga Bitcoin (BTC/MYR)"
              : "Bitcoin Price (BTC/MYR)"}
          </Heading>
        </Flex>

        {loading || conversionRate === null ? (
          <Spinner size="xl" color="teal.300" />
        ) : (
          <Flex direction="column" gap="20px">
            <Text fontSize="3xl" fontWeight="bold" color="teal.300">
              RM {price}
            </Text>
            <Text>
              {language === "bm" ? "sumber - Binance" : "source - Binance"}
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Home;
