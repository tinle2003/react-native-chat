import React, { Component } from "react";
import Modal from "react-native-modal";

const ModalSelector = (props) => {
  return (
    <Modal
      animationIn={"slideInUp"}
      isVisible={props.isVisibleModal}
      style={{ alignItems: "center", flex: 1 }}
      backdropOpacity={0.5}
    >
      {props.children}
    </Modal>
  );
};
export default ModalSelector;
