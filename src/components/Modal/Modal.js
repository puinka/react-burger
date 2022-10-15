import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ title, onCloseClick, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", (evt) =>
      handleEscKeyDown(evt, onCloseClick)
    );

    return () => {
      document.removeEventListener("keydown", (evt) =>
        handleEscKeyDown(evt, onCloseClick)
      );
    };
  }, []);

  const handleEscKeyDown = (evt, closeFunc) => {
    evt.key === "Escape" && closeFunc();
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

Modal.propTypes = {
  title: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
