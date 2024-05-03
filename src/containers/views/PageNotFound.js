import React from "react";
import { useHistory } from "react-router-dom";
import Text from "../../components/Typography/Typography";
import PageNotFoundLayout from "../layouts/PageNotFoundLayout";
import PageNotImage from "../../assets/images/pagenotfound.jpg";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <PageNotFoundLayout>
      <img src={PageNotImage} />
      <div className="cursor-pointer" onClick={() => history.go(-1)}>
        <Text color="text-Red" variant="h3">
          Go Back.........
        </Text>
      </div>
    </PageNotFoundLayout>
  );
};

export { PageNotFound };
