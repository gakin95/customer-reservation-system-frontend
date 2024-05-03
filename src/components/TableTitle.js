import Text from "./Typography/Typography";
import Button from "../components/forms/Button";

const TableTitle = ({ onClick, title, image, showButton, BtnTitle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={image} alt="" className="mr-2" />
        <Text variant="h3">{title}</Text>
      </div>
      {showButton && (
        <div>
          <Button
            onClick={onClick}
            className="px-2"
            size="small"
            backgroundColor="#fff"
            textColor="#3C48FC"
            title={BtnTitle || "New Role"}
            // title="New Role"
            style={{ border: "1px solid #3C48FC" }}
          />
        </div>
      )}
    </div>
  );
};

export default TableTitle;
