import React from "react";
import failure from "../../../../assets/images/love.svg";
import success from "../../../../assets/images/failure.svg";
import graph from "../../../../assets/images/graph.svg";
import Text from "../../../../components/Typography/Typography";
import {Skeleton,Box} from '@mui/material';

const Summary = ({ title, value, postivity, percentage, loading }) => {
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
          <div className="flex items-center justify-between mb-2">
            <Text variant="h4" color="font-normal text-TITLE">
              {title}
            </Text>
            <div className="flex items-center">
              <img src={postivity ? success : failure} alt="" />
              <div className={`ml-2 text-${postivity ? "green" : "red"}-500`}>
                {percentage}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Text variant="h3" color="font-bold text-NEUTRAL-900">
              {value}
            </Text>
            <img src={graph} alt="" />
          </div>
        </div>
      );
    }
  };
  return <div>{renderItem()}</div>;
};

export default Summary;
