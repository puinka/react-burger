import styles from "./modal.module.css";
import { FC, ReactNode, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalsContainer = document.querySelector("#modals") as HTMLElement;

type TModalProps = {
  title?: string;
  onCloseClick: () => void;
  children: ReactNode;
};

const Modal: FC<TModalProps> = ({ title, onCloseClick, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscKeyDown);

    return () => {
      document.removeEventListener("keydown", handleEscKeyDown);
    };
  }, []);

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    evt.key === "Escape" && onCloseClick();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.container}>
        {title && <h3 className="text text_type_main-large">{title}</h3>}
        <button className={styles.button} onClick={onCloseClick}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onCloseClick} />
    </>,
    modalsContainer
  );
};

export default Modal;
