import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Provider } from '@/store/StoreContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout || ((page: any) => page);

  return <Provider>{getLayout(<Component {...pageProps} />)}</Provider>;
};

export default MyApp;
