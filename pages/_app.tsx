import "../styles/globals.scss";
import {QueryClientProvider, QueryClient} from 'react-query'
import Head from "next/head";
import Routes from "../router";
import {AppProps} from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store";

const queryClient = new QueryClient()

export default function MyApp({
  Component,
  pageProps,
  router
}: AppProps): JSX.Element {

  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <>
            <Head>
                  <title>innovia</title>
                  <meta name="description" content="Generated by create next app" />
                  <link rel="icon" href="/icon.png" />
            </Head>
            <Routes
              Component={Component}
              pageProps={pageProps}
              router={router}
            /> 
            
          </>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
 
  );
}


