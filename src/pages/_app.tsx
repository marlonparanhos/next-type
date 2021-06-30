import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/globals';
import GitInfoProvider from './context/UserInfoContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GitInfoProvider>
      <Component {...pageProps} />
      <GlobalStyles />
    </GitInfoProvider>
  );
}
export default MyApp;
