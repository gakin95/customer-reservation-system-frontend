import React from "react";
import Button from "../../../../../components/forms/Button";

const RemoveVenue = (props) => {
  let title,
    subTitle,
    text,
    buttonText = "";
  if (props.action === "activate") {
    title = "Activate User";
    subTitle = "Are you sure you want to activate a user?";
    text =
      "Proceeding to activate user means the user will be active on your system";
    buttonText = "Yes Activate";
  } else if (props.action === "deactivate") {
    title = "Deactivate User  ⛔";
    subTitle = "Are you sure you want to deactivate a user?";
    text =
      "Proceeding to deactivate user means the user will be inactive from your system";
    buttonText = "Yes Deactivate";
  } else if (props.action === "delete") {
    title = "Delete User  🗑";
    subTitle = "Are you sure you want to delete a user?";
    text =
      "Proceeding to remove user means the user will be entirely removed from your system";
    buttonText = "Yes delete";
  }

  return (
    <div className="text-center px-4 -mt-5">
      <div className="text-4xl font-medium">{title}</div>
      <p className="mt-4 font-normal">{subTitle}</p>

      <div className="bg-BUTTON_FILLED p-3 my-8 text-GRAY-_100 text-sm">
        <svg
          className="inline mt-2 mr-2"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
            stroke="#3C48FC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 5.01953V5"
            stroke="#3C48FC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 9V17"
            stroke="#3C48FC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="align-middle">{text}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => props.closeModal(false)}
          className=" border-2 rounded border-BACKGROUND_GRAY p-3"
        >
          Cancel
        </button>
        <Button
          style={{ height: "60px" }}
          onClick={props.handleClick}
          isLoading={props.isLoading}
          disabled={props.isLoading}
          backgroundColor={
            props.action === "deactivate" ? "#E01A00" : "#3C48FC"
          }
          title={buttonText}
          size="medium"
          type="submit"
        />
      </div>
    </div>
  );
};

export default RemoveVenue;
