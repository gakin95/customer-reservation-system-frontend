import { Skeleton, Box } from "@mui/material";
import Text from "../../components/Typography/Typography";


const InfoCard = ({ title, value, loading, image }) => {
  const renderItem = () => {
    if (loading) {
      return (
        <Box>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      );
    } else {
      return (
        <div>
          <Text variant="h4" color="font-normal text-TITLE">
            {title}
          </Text>
          <div className="flex items-center justify-between">
            <Text variant="h3" color="font-bold text-NEUTRAL-900">
              {value}
            </Text>
            <img src={image} alt="" />
          </div>
        </div>
      );
    }
  };
  return <div>{renderItem()}</div>;
};

export default InfoCard;
