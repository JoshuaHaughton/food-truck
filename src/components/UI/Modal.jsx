import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

//Creates a black backdrop for overlays
const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

//Returns a container for cart content
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement =  document.getElementById('overlay-root');

//Use createPortal to render HTML elements outside of the normal root div for semantic friendliness
const Modal = (props) => {
  
  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
