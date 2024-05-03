/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";

import styled from "styled-components";

const portatRoot = document.getElementById("portal-root2");

const ModalPopupForm = ({
  children,
  isOpen,
  modalWidth = "500px",
  modalHeight = "450px",
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Background>
      <div
        className="bg-white p-10"
        style={{ borderRadius: 10, width: modalWidth, height: modalHeight }}
      >
        {children}{" "}
      </div>
    </Background>,
    portatRoot
  );
};

export default ModalPopupForm;

const Content = styled.div`
  background: #ffffff;
  /* width: 400px;
  height: 450px; */
  padding: 25px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  z-index: 40;
  justify-content: center;
  align-items: center;
`;
