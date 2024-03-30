import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { Layout } from '../components/index';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

/**
 * This is the Home Page
 * @return {JSX.Element}: The JSX Code for Home Page
 */
function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta property='og:url' content='https://blog-v2-olive.vercel.app/' />
          <meta property='og:type' content='website' />;
          <meta property='og:site_name' content='NEXT JS BLOG V2' />
          <meta property='og:title' content='NEXT JS BLOG V2' />
          <meta itemProp='name' content='NEXT JS BLOG V2' />
          <meta name='author' content='Atharva Joshi' />
          <meta name='language' content='en-us' />
          <meta name='description' content='ARJs Portfolio Website Version 2' />
          <meta name='theme-color' content='#121212' />
          <meta charSet='utf-8' />
          <meta
            itemProp='image'
            content='https://ik.imagekit.io/36athv2v82c8/Screenshot_2023-06-15_145157_4xku9vQwz.png?updatedAt=1686820951317'
          />
          <meta
            property='og:image'
            content='https://ik.imagekit.io/36athv2v82c8/Screenshot_2023-06-15_145157_4xku9vQwz.png?updatedAt=1686820951317'
          />
          <meta
            property='og:image:url'
            content='https://ik.imagekit.io/36athv2v82c8/Screenshot_2023-06-15_145157_4xku9vQwz.png?updatedAt=1686820951317'
          />
          <title>THE BLOG</title>
          <link rel='icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon-512x512.png' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
