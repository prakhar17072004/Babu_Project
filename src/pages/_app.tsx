// _app.tsx or similar
import { LoginProvider } from '../components/LoginContext';

function MyApp({ Component, pageProps }: any) {
  return (
    <LoginProvider>
      <Component {...pageProps} />
    </LoginProvider>
  );
}

export default MyApp;