// _app.tsx or _app.js
import '../styles/globals.css'; // Or your global CSS import
import { LoginProvider } from '../components/LoginContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>
  );
}

export default MyApp;