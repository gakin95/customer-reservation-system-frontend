import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helper/utils";

const ProtectedRoute = ({
  component: Component,
  exact,
  layout: Layout,
  path,
  title,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      exact
      title
      path={path}
      key={path}
      render={(props) =>
        isAuthenticated() ? (
          <Layout {...props}>
            <Component {...props}></Component>
          </Layout>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
