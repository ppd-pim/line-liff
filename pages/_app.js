import { useEffect } from "react";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.css'

const liffId = '1661279233-dDV4VVlZ';

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
