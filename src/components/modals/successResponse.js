import React from "react";
import Button from "../forms/Button";
import SucessCheck from "../../assets/images/sucessImg.svg";

const SuccessResponse = ({ title, message, closeModal }) => {
  return (
    <div className="text-center px-4 -mt-5">
      <div className="text-4xl font-medium">{title}</div>
      <div className="bg-BUTTON_FILLED p-3 my-8 text-GRAY-_100 text-sm flex items-center justify-between">
        <div>
          <img src={SucessCheck} alt="" />
        </div>
        <div>
          <span className="align-middle">{message}</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-1/2">
          <Button onClick={closeModal} title="Done" size="medium" />
        </div>
      </div>
    </div>
  );
};

export default SuccessResponse;
