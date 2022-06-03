import "../styles/globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Settings.module.css";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
          integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
          crossorigin="anonymous"
        ></script>
      </Head>

<<<<<<< HEAD
      <Component {...pageProps} />
    </div>
  );
=======
    <Component {...pageProps} />
  </div>
  )
>>>>>>> 3c7854f7722127246a1726c4be943d907c1f3da9
}

export default MyApp
