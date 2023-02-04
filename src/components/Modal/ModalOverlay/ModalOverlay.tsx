import styles from "./modaloverlay.module.css";
import { FC } from "react";

type TModalOverlay = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;
