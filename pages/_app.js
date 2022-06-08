import 'antd/dist/antd.css'
import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import { ContextProvider } from "../context/context";
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <Component {...pageProps} />
        </div>
      </div>
    </ContextProvider>
  );
}

export default MyApp
