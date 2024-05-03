import React from "react";

import empty from "../assets/images/empty.svg";

const EmptyState = ({
  mainEmptyStateText = "No data available",
  subEmptyStateText = "",
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={empty} alt="emptyState" />
      <div className="text-center">
        <p className="font-bold text-NEUTRAL-_900 my-2">{mainEmptyStateText}</p>
        <p className="font-normal text-GRAY-_100">{subEmptyStateText}</p>
      </div>
    </div>
  );
};

export default EmptyState;
