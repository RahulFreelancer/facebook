import "../styles/globals.css";

import Store from "../components/store";
import Layout from "../components/layout";
import LightStore from '../components/lightStore';
import "../styles/globals.css";
import ThirdStore from "../components/thirdStore";
// import LightStore from '../components/lightStore';

function MyApp({ Component, pageProps }) {
  return (
    <>
   
      <Store>
        <LightStore>
          <ThirdStore>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </ThirdStore>
        </LightStore>
      </Store>

    </>
  );
}

export default MyApp;
