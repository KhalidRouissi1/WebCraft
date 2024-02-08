import { useRouter } from 'next/router';
import "grapesjs/dist/css/grapes.min.css";
import "../styles/editor.css";
import "../styles/global.css";
import "./index.css";
import Footer from "./components/Footer"
import Header from "./components/Header"

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const excludeHeaderRoutes = ['/builder'];

  // Check if the current route should exclude the header
  const excludeHeader = excludeHeaderRoutes.includes(router.pathname);

  return (
    <>
      {!excludeHeader && <Header />}
      <Component {...pageProps} />
      {!excludeHeader && <Footer />}
    </>
  );
}
