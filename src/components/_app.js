import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
// Import the ErrorBoundary component
import ErrorBoundary from '../components/ErrorBoundary';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  
  //console.log('Layout',status);
  

  return (
    <ErrorBoundary>
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
    </ErrorBoundary>
  );
}
