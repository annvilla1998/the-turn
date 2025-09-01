import React from "react";
import "@/styles/globals.scss";
import Head from "next/head";
// ...existing code...
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/utils/theme";

export default function App({ Component, pageProps: { ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  useEffect(() => {
    const isWhiteBackground = router.pathname.includes("the-turn");
    document.documentElement.style.backgroundColor = isWhiteBackground
      ? "#ffffff"
      : "#000000";
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>The Turn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}
