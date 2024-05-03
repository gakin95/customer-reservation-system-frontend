import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../helper/utils";

export const AuthRoute = ({
  component: Component,
  exact,
  layout: Layout,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    exact
    path={path}
    key={path}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Layout {...props}>
          <Component {...props}></Component>
        </Layout>
      )
    }
  ></Route>
);
