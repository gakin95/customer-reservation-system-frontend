import successCheck from "../../assets/images/successCheck.svg";
import Text from "../../components/Typography/Typography";
import Button from "../forms/Button";

const TransactionConfirmation = ({
  closeModal,
  textMessage,
  subTextMessage,
  buttonText,
  image,
  isLoadingLogin,
}) => (
  <div className="w-3/6">
    <div className="flex justify-center items-center">
      <img src={successCheck} alt="" />
    </div>
    <Text
      format="mt-10 text-center"
      variant="h3"
      color="text-PRIMARY-_700"
      weight="bold"
    >
      {textMessage}
    </Text>
    <div className={`${image ? "flex items-center mb-4 mt-4" : ""}`}>
      {image && <img src={image} alt="" className="mr-2" />}
      <Text
        variant="small"
        format={`${!image ? "mt-4 mb-10" : ""} text-center`}
        color="text-NEUTRAL-_600"
        weight="normal"
      >
        {subTextMessage}
      </Text>
    </div>
    <Button
      onClick={closeModal}
      title={buttonText}
      isLoading={isLoadingLogin}
      disabled={isLoadingLogin}
      type="primary"
      size="lg"
    />
  </div>
);

export default TransactionConfirmation;
