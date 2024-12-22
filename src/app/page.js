"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Text, Heading, Flex, Container, Stack } from "@chakra-ui/react";
import { useLanguage } from "@context/LanguageContext";
import { BITCOIN_INFO } from "@utils/constants";
import CardInfo from "@components/CardInfo";

const IndexPage = () => {
  const { language } = useLanguage();
  const [price, setPrice] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);
  const [loadingState, setLoadingState] = useState("fetching-conversion");
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=myr`
        );
        const data = await response.json();
        setConversionRate(data?.usd?.myr || 1);
        setLoadingState("streaming-prices");
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConversionRate(1);
        setLoadingState("streaming-prices");
      }
    };

    fetchConversionRate();
  }, []);

  useEffect(() => {
    if (conversionRate === null) return;

    const socket = new WebSocket(
      "wss://stream.binance.com/stream?streams=btcusdt@trade"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)?.data;
      const formattedPrice = (parseFloat(data.p) * conversionRate).toFixed(2);
      setPrice(formattedPrice);
      setLoadingState("done");
    };

    return () => socket.close();
  }, [conversionRate]);

  useEffect(() => {
    const tickerSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    );

    tickerSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const changePercentage = parseFloat(data.P);
      setPercentageChange(changePercentage);
    };

    return () => tickerSocket.close();
  }, []);

  const renderLoadingMessage = () => {
    switch (loadingState) {
      case "fetching-conversion":
        return language === "bm"
          ? "Sedang mendapatkan kadar pertukaran..."
          : "Fetching conversion rates...";
      case "streaming-prices":
        return language === "bm"
          ? "Sedang memuatkan harga Bitcoin secara langsung..."
          : "Streaming live Bitcoin prices...";
      default:
        return null;
    }
  };

  return (
    <Container pt={10}>
      <Box
        borderRadius="lg"
        p={3}
        align="center"
        boxSize="auto"
        color="white"
        bg="#1b1b1b"
        textAlign="center"
        boxShadow="lg"
      >
        <Stack>
          <Flex
            direction="row"
            align="center"
            justifyContent="center"
            padding="15px 0"
          >
            <Image
              src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
              alt="Bitcoin Logo"
              width={40}
              height={40}
              style={{ marginRight: "10px" }}
              priority
            />
            <Heading size="xl">
              {language === "bm"
                ? "Harga Bitcoin (BTC/MYR)"
                : "Bitcoin Price (BTC/MYR)"}
            </Heading>
          </Flex>

          {loadingState !== "done" ? (
            <Flex
              direction="column"
              justify="center"
              align="center"
              minHeight="150px"
              gap={3}
            >
              <Text fontSize="lg" fontWeight="bold" color="teal.300">
                {renderLoadingMessage()}
              </Text>
            </Flex>
          ) : (
            <Flex direction="column" gap="20px" minHeight="150px">
              <Text fontSize="3xl" fontWeight="bold" color="teal.300">
                RM {price}
                {percentageChange !== null && (
                  <Text
                    fontSize="sm"
                    color={percentageChange > 0 ? "green.400" : "red.400"}
                  >
                    {percentageChange > 0
                      ? `+${percentageChange.toFixed(2)}% (24h)`
                      : `${percentageChange.toFixed(2)}% (24h)`}
                  </Text>
                )}
              </Text>

              <Text fontSize="sm" fontWeight="bold">
                {language === "bm" ? "Sumber: Binance" : "Source: Binance"}
              </Text>
            </Flex>
          )}
        </Stack>
      </Box>

      <CardInfo {...BITCOIN_INFO[language]} />
    </Container>
  );
};

export default IndexPage;
