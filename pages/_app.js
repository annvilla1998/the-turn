import '@/styles/globals.scss';
import { Provider } from 'react-redux';
import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from "react";
import { useRouter } from "next/router";
let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  useEffect(() => {
    const isWhiteBackground = router.pathname.includes("the-turn");
    document.documentElement.style.backgroundColor = isWhiteBackground ? "#ffffff" : "#000000";
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>The Turn</title>
        <meta name="description" content="Golf simulator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {getLayout(<Component {...pageProps} />)}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
