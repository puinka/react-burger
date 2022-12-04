import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef } from "react";
import styles from "./notFound.module.css";
import lottie from "lottie-web";
import { Link } from "react-router-dom";

export default function NotFound404() {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../images/not-found.json"),
    });
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.container} ref={container}></div>
      <Link to="/">
        <Button>На главную</Button>
      </Link>
    </main>
  );
}
