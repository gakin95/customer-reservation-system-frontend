import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import arc from "../../assets/images/arc.svg";
import nigeria from "../../assets/images/nigeria.svg";
import Text from "../../components/Typography/Typography";
import Input from "../../components/forms/input";
import Password from "../../components/forms/password";
import Button from "../../components/forms/Button";

import { allowNumbersOnly } from "../../helper/index";

import useAuthService from "../../services/useAuthService";

const Landing = (props) => {
  const history = useHistory();
  const { signUp, postRequest } = useAuthService();

  const { isLoading } = postRequest;

  const formValidationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
      .required("Firstname is Required"),
    lastName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
      .required("Lastname is Required"),
    phoneNumber: Yup.number()
      .typeError("Phone Number must be a number")
      .required("Phone Number is required"),
      username: Yup.string()
      .min(3)
      .required("Username must be at least 3 characters long"),
    emailAddress: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    // typeOfBusiness: Yup.string().required("Type Of Business is Required"),
  });
  return (
    <div className="w-full min-h-screen">
      <div
        className="hidden md:block bg-BLUE-_400 fixed py-14 px-8 min-h-full"
        style={{ width: "30%" }}
      >
        <img src={"https://www.logologo.com/logos/flower-logo.jpg"} alt="logo" style={{width:'5rem'}} />
        <Text color="font-bold text-white pt-20" variant="h2">
          A few clicks away from becoming our{" "}
          <span className="italic">partner</span>
        </Text>
        <div className="pt-12">
          <div className="flex justify-center">
            <img src={arc} alt="arc" />
          </div>
          <Text color="font-normal text-BLUE-_200" variant="h4">
            Start your journey with to book a Hotel, Event Space and Restaurant
          </Text>
        </div>
      </div>
      <div className="py-4 md:py-14 md:px-20 px-4 min-h-full bg-BACKGROUND_LIGHT businessDetails">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            phoneNumber: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            userType: "Customer",
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values, { resetForm, errors }) => {
            signUp(values, history);
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit} className="mt-8">
              <>
                <Text color="font-bold mb-1" variant="h2">
                  Customer Onboarding
                </Text>
                <Text color="font-bold mb-1 text-NEUTRAL-_600" variant="h4">
                  Please take a moment to introduce yourself
                </Text>
              </>
              <div className="my-8 bg-white shadow-md p-8 w-full md:w-5/6">
                <div className="">
                  <Text color="font-bold mb-1 text-NEUTRAL-_600" variant="h4">
                    About You
                  </Text>
                  <Text color="font-bold mb-1 text-TITLE pt-2" variant="body">
                    Kindly provide your personal details
                  </Text>
                </div>
                <div className="flex w-full mt-6 justify-between">
                  <span style={{ width: "48%" }}>
                    <Input
                      placeholder="*First Name"
                      type="text"
                      handleChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                    />
                    {errors.firstName && touched.firstName ? (
                      <Text
                        variant="small"
                        weight="normal"
                        color="text-red-700"
                      >
                        {errors.firstName}
                      </Text>
                    ) : null}
                  </span>
                  <span style={{ width: "48%" }}>
                    <Input
                      placeholder="*Last Name"
                      handleChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                    />
                    {errors.lastName && touched.lastName ? (
                      <Text
                        variant="small"
                        weight="normal"
                        color="text-red-700"
                      >
                        {errors.lastName}
                      </Text>
                    ) : null}
                  </span>
                </div>
                <div className="mt-6">
                  <Input
                    placeholder="*Phone Number"
                    prefixIcon={nigeria}
                    handleChange={handleChange}
                    value={allowNumbersOnly(values.phoneNumber, 11)}
                    name="phoneNumber"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text variant="small" weight="normal" color="text-red-700">
                    {errors.phoneNumber}
                  </Text>
                ) : null}
                <div className="mt-6">
                  <Input
                    placeholder="User name"
                    handleChange={handleChange}
                    value={values.username}
                    name="username"
                  />
                </div>
                {errors.username && touched.username ? (
                  <Text variant="small" weight="normal" color="text-red-700">
                    {errors.username}
                  </Text>
                ) : null}
                <div className="mt-6">
                  <Input
                    placeholder="Email Address"
                    handleChange={handleChange}
                    value={values.emailAddress}
                    name="emailAddress"
                  />
                </div>
                {errors.emailAddress && touched.emailAddress ? (
                  <Text variant="small" weight="normal" color="text-red-700">
                    {errors.emailAddress}
                  </Text>
                ) : null}
                <div className="flex w-full justify-between mt-6">
                  <span style={{ width: "48%" }}>
                    <Password
                      placeholder="*Password"
                      handleChange={handleChange}
                      value={values.password}
                      name="password"
                    />
                    {errors.password && touched.password ? (
                      <Text
                        variant="small"
                        weight="normal"
                        color="text-red-700"
                      >
                        {errors.password}
                      </Text>
                    ) : null}
                  </span>
                  <span style={{ width: "48%" }}>
                    <Password
                      placeholder="*Confirm Password"
                      handleChange={handleChange}
                      value={values.confirmPassword}
                      name="confirmPassword"
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Text
                        variant="small"
                        weight="normal"
                        color="text-red-700"
                      >
                        {errors.confirmPassword}
                      </Text>
                    ) : null}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="my-10 w-full md:w-1/6">
                  <Button
                    title="Go back"
                    size="medium"
                    type="button"
                    onClick={() => props.history.push('/')}
                  />
                </div>
                <div className="my-10 w-full md:w-1/6">
                  <Button
                    title="Register"
                    size="medium"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export { Landing };
