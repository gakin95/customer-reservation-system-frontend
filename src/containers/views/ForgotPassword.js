import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";
import Text from "../../components/Typography/Typography";
import LoginLayout from "../layouts/loginLayout";
import Input from "../../components/forms/input";
import BackButton from "../../components/BackButton";
import Button from "../../components/forms/Button";

import useAuthService from "../../services/useAuthService";

const ForgotPassword = () => {
  const history = useHistory();
  const { forgotPassword, putRequest } = useAuthService();
  const { isLoading, error, isError } = putRequest;

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
  });
  return (
    <LoginLayout>
      <div className="flex flex-col justify-center items-center mb-10 mt-5">
        <div className="border border-NEUTRAL-_200 rounded-lg bg-white shadow-sm">
          <div className="border-b border-NEUTRAL-_200 py-4 pl-10">
            <BackButton />
          </div>
          <div className="p-10">
            <Text color="font-bold text-BLUE-_900 pb-2" variant="h3">
              Forgot Password 👋
            </Text>
            <Text color="font-normal NEUTRAL-_600" variant="h4">
              Enter the email associated with your account
            </Text>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotPasswordSchema}
              onSubmit={async (values) => {
                const data = {
                  email: values.email,
                  fingerPrint: "",
                };
                try {
                  const response = await forgotPassword(data, history);
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
                      type="email"
                      name="email"
                      handleChange={handleChange}
                    />
                    {errors.email && touched.email ? (
                      <Text
                        variant="small"
                        weight="normal"
                        color="text-red-700"
                      >
                        {errors.email}
                      </Text>
                    ) : null}
                  </>

                  {isError && (
                    <Text
                      variant="body"
                      weight="normal"
                      format="mt-6 text-center"
                      color="text-red-700"
                    >
                      {error?.data?.description}
                    </Text>
                  )}
                  <div className="mt-28">
                    <Button
                      title="Submit"
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    />
                    <div className="flex items-center justify-center pt-7">
                      <Text color="font-medium text-TITLE pr-4" variant="body">
                        Remember password ?{" "}
                        <Link to="/">
                          <span className="text-BLUE-_400">Sign In</span>
                        </Link>
                      </Text>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export { ForgotPassword };
