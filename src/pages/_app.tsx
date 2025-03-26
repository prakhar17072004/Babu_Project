import '../app/globals.css'; // Ensure this path is correct
import { LoginProvider } from '@/components/LoginContext';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
       <link rel="icon" href="/favicon.png" />
      <Component {...pageProps} />
    </LoginProvider>
  );
}
