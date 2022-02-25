import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "dotenv/config";
import { useEffect } from "react";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>RMSystem</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default MyApp;
