import Head from "next/head";
import "../styles/globals.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Scaling Documents with Bleed | Calculator</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
