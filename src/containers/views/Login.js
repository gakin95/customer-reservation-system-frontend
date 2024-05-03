import { Form, Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/input";
import Password from "../../components/forms/password";
import Text from "../../components/Typography/Typography";
import useAuthService from "../../services/useAuthService";
import tokenService from "../../services/token.service";
import LoginLayout from "../layouts/loginLayout";

const InitialloginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Login = (props) => {
  const history = useHistory();
  const { login, postRequest } = useAuthService(props);
  const { isLoading, error, isError } = postRequest;

  React.useEffect(() => {
    tokenService.removeUser();
  }, []);

  return (
    <LoginLayout>
      <div className="py-10 px-5 md:p-0 w-custom-1">
        <img style={{width:"4rem"}} className="mb-5" src={'https://www.logologo.com/logos/flower-logo.jpg'} alt="logo" />
        <div className="border border-NEUTRAL-_200 p-8 rounded-lg bg-white shadow-sm">
          <Text color="font-bold text-BLUE-_900 pb-2" variant="h3">
            Welcome Back 👋
          </Text>
          <Text color="font-normal NEUTRAL-_600" variant="h4">
            Enter your Email address and Password
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={InitialloginSchema}
            onSubmit={async (values) => {
              const data = {
                email: values.email,
                password: values.password,
              };
              try {
                await login(data, history);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form onSubmit={handleSubmit} className="mt-6">
                <>
                  <Input
                    placeholder="Email Address"
                    type="text"
                    name="email"
                    handleChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <Text variant="small" weight="normal" color="text-red-700">
                      {errors.email}
                    </Text>
                  ) : null}
                </>

                <div className="mt-4">
                  <Password
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    handleChange={handleChange}
                    value={values.password}
                    className="w-full"
                  />
                  {errors.password && touched.password ? (
                    <Text variant="small" weight="normal" color="text-red-700">
                      {errors.password}
                    </Text>
                  ) : null}
                </div>
                {isError && (
                  <Text
                    variant="small"
                    weight="normal"
                    format="mt-2 text-center"
                    color="text-red-700"
                  >
                    {error?.data?.data?.message}
                  </Text>
                )}
                <div className="mt-28">
                  <Button
                    type="submit"
                    title="Log in"
                    isLoading={isLoading}
                    disabled={isLoading}
                  />

                  <div className="flex items-center pt-7">
                    <Text color="font-medium text-TITLE pr-4" variant="body">
                      Don't have an account ?{" "}
                      <Link to="/onboarding">
                        <span className="text-blue-800">Sign Up</span>
                      </Link>
                    </Text>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </LoginLayout>
  );
};

export { Login };
