import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalPopup from "../../components/modals/ModalPopup";
import TransactionConfirmation from "../../components/partials/TransactionConfirmation";
import Text from "../../components/Typography/Typography";
import LoginLayout from "../layouts/loginLayout";
import BackButton from "../../components/BackButton";
import Password from "../../components/forms/password";
import Button from "../../components/forms/Button";
import { Link, useHistory } from "react-router-dom";

import { useMutation } from "react-query";
import { api } from "../../services/api";

const ChangePassword = (props) => {
  const history = useHistory();
  const {
    location: { state },
  } = props;

  const {
    mutateAsync,
    isLoading,
    isError,
    error,
    data: changePasswordData,
  } = useMutation(api.put);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const closeConfirmationModal = () => {
    setConfirmationModal(false);
    history.push("/");
  };

  const handleCreateNewPasscode = async (values) => {
    const passcodePayload = {
      id: state?.userId,
      password: values.new_password,
      previousPassword: "",
    };
    try {
      await mutateAsync([
        "/api/v1/partner/passwordactivation",
        passcodePayload,
      ]);
      setConfirmationModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  const formValidationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("New Password Required"),
    confirm_new_password: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Passwords must match"
    ),
  });
  return (
    <LoginLayout>
      <div className="py-10 px-5 md:p-0 w-custom-1">
        <div className="border border-NEUTRAL-_200 rounded-lg bg-white shadow-sm">
          <div className="border-b border-NEUTRAL-_200 py-4 pl-10">
            <BackButton />
          </div>
          <div className="p-10">
            <Text color="font-bold text-BLUE-_900 pb-2" variant="h3">
              Choose New Password 👋
            </Text>
            <Text color="font-normal NEUTRAL-_600" variant="h4">
              Kindly provide a new password to proceed.
            </Text>
            <Formik
              initialValues={{
                new_password: "",
                confirm_new_password: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values, { resetForm, errors }) => {
                handleCreateNewPasscode(values);
              }}
            >
              {({
                handleSubmit,
                handleChange,
                setFieldValue,
                values,
                resetForm,
                touched,
                errors,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit} className="mt-6">
                  <label
                    htmlFor="password"
                    className="font-normal text-sm text-NEUTRAL-_900 pb-2"
                  >
                    New Password
                  </label>
                  <Password
                    placeholder="New Password"
                    type="password"
                    name="new_password"
                    handleChange={handleChange}
                    className="w-full"
                  />
                  <p className="text-sm text-red-500">{errors.new_password}</p>
                  <div className="mt-4">
                    <label
                      htmlFor="password"
                      className="font-normal text-sm text-NEUTRAL-_900 pb-2"
                    >
                      Re-enter New Password
                    </label>
                    <Password
                      placeholder="*Confirm New Password"
                      type="password"
                      name="confirm_new_password"
                      handleChange={handleChange}
                      className="w-full"
                    />
                    <p className="text-sm text-red-500">
                      {errors.confirm_new_password}
                    </p>
                  </div>
                  <div className="mt-28">
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      title="Confirm new password"
                    />
                    <div className="flex items-center justify-center pt-7">
                      <Link to="/">
                        <Text
                          color="font-medium text-TITLE pr-4"
                          variant="body"
                        >
                          Remember password?
                          <span className="text-BLUE-_400">Sign In</span>
                        </Text>
                      </Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <ModalPopup isOpen={confirmationModal}>
          <TransactionConfirmation
            closeModal={(e) => closeConfirmationModal(e)}
            textMessage="Password changed 🚀"
            subTextMessage="Your password has been successfully changed. Kindly log in to access account"
            buttonText="Log in"
          />
        </ModalPopup>
      </div>
    </LoginLayout>
  );
};

export { ChangePassword };
