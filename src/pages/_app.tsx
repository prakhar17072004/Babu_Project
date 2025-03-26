import '../app/globals.css'; // Ensure this path is correct
import { LoginProvider } from '@/components/LoginContext';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>
  );
}
