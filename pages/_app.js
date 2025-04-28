import React from "react";
import "@/styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "@/utils/theme";
import SubscriptionCheck from "@/components/subscription-check";
let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Head>
          <title>The Turn</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <SessionProvider session={session}>
          <Provider store={store}>
            <SubscriptionCheck />
            <PersistGate loading={null} persistor={persistor}>
              {getLayout(<Component {...pageProps} />)}
            </PersistGate>
          </Provider>
        </SessionProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
