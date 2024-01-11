import "@/styles/global.css";
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});
 
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>DeliTrack</title>
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </Head>
    {/* <ThemeProvider attribute="class" defaultTheme='light'> */}
      <main className={`${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    {/* </ThemeProvider> */}
    </>
  );
}