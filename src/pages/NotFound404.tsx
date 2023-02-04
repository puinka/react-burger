import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useRef } from "react";
import styles from "./notFound.module.css";
import lottie from "lottie-web";
import { Link } from "react-router-dom";

const NotFound404: FC = () => {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current as HTMLDivElement,
      //render: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../images/not-found.json"),
    });
  }, [container]);
  return (
    <main className={styles.main}>
      <div className={styles.container} ref={container}></div>
      <Link to="/">
        <Button htmlType="button">На главную</Button>
      </Link>
    </main>
  );
};

export default NotFound404;
