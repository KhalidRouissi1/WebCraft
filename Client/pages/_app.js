import { useRouter } from "next/router";
import "grapesjs/dist/css/grapes.min.css";
import "../styles/editor.css";
import "../styles/global.css";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user", {
          withCredentials: true,
        });
        setUserData(res.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      Object.keys(userData).length !== 0 &&
      (router.pathname === "/auth" || router.pathname === "/auth/register")
    ) {
      router.push("/");
    }
  }, [userData, router.pathname]);

  return <Component {...pageProps} />;
}
