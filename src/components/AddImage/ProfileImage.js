import { Avatar, CircularProgress, Tooltip } from "@mui/material";
import ErrorMessage from "../../containers/views/multiStepViews/fields/Error";

const ProfileImage = ({
  image,
  fileInputRef,
  onChange,
  onClick,
  loading,
  error,
  touched,
  disabled = false,
}) => {
  const fileUploader = () => {
    return (
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Tooltip title="Add Image">
            <div className="text-center">
              <Avatar
                alt=""
                src={image}
                sx={{ width: 90, height: 90, cursor: "pointer" }}
                onClick={onClick}
                className={error && touched ? "border-2 border-red-800 rounded" : ""}
              />
              {error && touched && (
                <ErrorMessage error={error} touched={touched} />
              )}
            </div>
          </Tooltip>
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

  return <div>{fileUploader()}</div>;
};

export default ProfileImage;
 