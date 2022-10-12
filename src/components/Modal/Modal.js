import styles from "./modal.module.css";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ title, onCloseClick, onEscKeydown, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

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
