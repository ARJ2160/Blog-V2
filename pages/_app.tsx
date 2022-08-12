import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

/**
 * This is the Home Page
 * @return {JSX.Element}: The JSX Code for Home Page
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
