# BitRinggit

Live Bitcoin price in Malaysian Ringgit, with the 24 hour change. The page is available in English and Bahasa Malaysia.

**Live:** https://bitringgit.netlify.app/

## How it works

- USD to MYR rate comes from the CoinGecko API
- BTC/USDT trades stream in over Binance's WebSocket and get converted to MYR on the fly
- 24 hour change comes from Binance's ticker stream
- Language switching (EN / BM) is handled with a React context

## Built with

Next.js, React, Chakra UI v3, next-themes

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.
