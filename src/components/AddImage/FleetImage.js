import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import AddImage from "../../assets/images/addimage.svg";

const FleetImage = ({
  image,
  fileInputRef,
  onChange,
  loading,
  onClick,
  onRemove,
  disabled = false,
  editMode = false,
}) => {
  const fileUploader = (image) => {
    return (
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <img
            src={image}
            alt=""
            className={`h-16 w-16 m-2 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={onClick}
          />
        )}
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          ref={fileInputRef}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    );
  };
  const displayImage = () => {
    if (!image) {
      return fileUploader(AddImage);
    } else if (image && !editMode) {
      return (
        <Tooltip title="Delete">
          <img
            src={image}
            alt=""
            className="h-16 w-16 cursor-pointer"
            onClick={onRemove}
          />
        </Tooltip>
      );
    } else {
      return (
        <div>
          <Tooltip title="Edit">{fileUploader(image)}</Tooltip>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            ref={fileInputRef}
            onChange={onChange}
          />
        </div>
      );
    }
  };
  return <div>{displayImage()}</div>;
};

export default FleetImage;
