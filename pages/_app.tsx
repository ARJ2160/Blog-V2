import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

/**
 * This is the Home Page
 * @return {JSX.Element}: The JSX Code for Home Page
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>THE BLOG</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
