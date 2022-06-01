<<<<<<< HEAD
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;

import '../styles/globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/Settings.module.css";

import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <Head>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    </Head>

    <Component {...pageProps} />
  </div>
  )
>>>>>>> 87069ce87738d6621229f63a82547de0d4e5c256
}

export default MyApp;
