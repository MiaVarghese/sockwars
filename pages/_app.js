import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Head from "next/head";
import { GameProvider } from "./hooks/GameContext";
import { UserProvider } from "./hooks/UserContext";

function MyApp({ Component, pageProps }) {

  return (
    <div>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"></link>
      </Head>

      <UserProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </UserProvider>
    </div>
  );
}

export default MyApp
