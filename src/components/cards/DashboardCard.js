import Button from "../../components/forms/Button";
import Text from "../../components/Typography/Typography";
import { Link } from "react-router-dom";

const DashboardCard = ({ image, title, subTitle, buttonText, bgImage, pathName }) => {
  return (
    <div
      className="my-4 p-10 bg-cover bg-no-repeat"
      style={{
        background: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <img src={image} alt="UserImg" />
        </div>
        <Text color="font-bold mb-1 text-NEUTRAL-900" variant="h3">
          {title}
        </Text>
        <Text
          color="font-normal w-64 mb-1 text-TITLE text-center pt-2"
          variant="body"
        >
          {subTitle}
        </Text>
        <div className="mt-2 mb-2">
          <Link to={pathName}>
            <Button
            style={{
              padding: "8px"
            }}
              backgroundColor="#3C48FC"
              title={buttonText}
              isPlus={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { DashboardCard };
