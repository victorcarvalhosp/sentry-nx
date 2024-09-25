import { AppProps } from 'next/app';
import * as Sentry from '@sentry/nextjs';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to sentry-nx!</title>
      </Head>
      <main className="app">
        <Sentry.ErrorBoundary showDialog>
          <Component {...pageProps} />
        </Sentry.ErrorBoundary>
      </main>
    </>
  );
}

export default CustomApp;
