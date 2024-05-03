/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";

import styled from "styled-components";

const portatRoot = document.getElementById("portal-root");

const Modal = ({ children, isOpen, paddingWidth = "68px 48px" }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Background>
      <div
        className="bg-white overflow-scroll h-full w-96 z-20"
        style={{ width: "400px", padding: paddingWidth }}
      >
        {children}{" "}
      </div>
    </Background>,
    portatRoot
  );
};

export default Modal;

const Content = styled.div`
  background: #ffffff;
  height: 100%;
  width: 400px;
  padding: 68px 48px;
`;
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 40;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
