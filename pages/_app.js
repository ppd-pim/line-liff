import { useEffect } from "react";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css'

const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

function MyApp({ Component, pageProps }) {
  useEffect( () => {
    const loadData = async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId });
      } catch (error) {
        console.error("liff init error", error.message);
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    };

    // then call it here
    loadData();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
