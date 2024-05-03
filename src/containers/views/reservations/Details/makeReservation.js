import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Text from "../../../../components/Typography/Typography";
import Button from "../../../../components/forms/Button";
import ReservationService from "../../../../services/reservation.service";
import { Form, Formik } from "formik";
import MyInput from "../../multiStepViews/fields/Input";
import {
  errorNotification,
  successNotification,
} from "../../../../services/helper/toastNotification";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Grid } from "@mui/material";
import Item from "./item";

const stripePromise = loadStripe(
  "pk_test_51P5hAECLcpGJG7r6QRbjbpemYtdXjEO9Ghv3clEgpvl2M7nb8m182VKIYvAlp36Ugi5PekfeEkLvsK5z2dXA7p2900yYc8kSdz"
);
const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Customize appearance here
  appearance: {
    /*...*/
  },
};

const MakeReservation = () => {
  const [loading, setloading] = useState(false);
  const details = useSelector((state) => state.reservationData.details);
  const user = useSelector((state) => state.user.details);
  const history = useHistory();
  const { createReservation, makePayment } = ReservationService();

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (values) => {
    console.log("values-------------------", values);
    setloading(true);
    if (!stripe || !elements) {
      setloading(false);
      console.error("Stripe not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);
    if (error) {
      setloading(false);
      alert(`Payment error: ${error.message}`);
    } else {
      //Handle the token on your server
      const payload = {
        venueID: details.venue_id,
        startTime: details.start_time,
        endTime: details.end_time,
        numberOfGuests: values.numberOfGuests,
        amount: details.amount,
        userID: user.UserID,
        numberOfGuests: values.numberOfGuests,
      }
      const response = await createReservation({
        ...payload,
        reservationDate: details.date,
        status: "Pending",
      });
      if (response.status == "success") {
        successNotification(response.message);
        const payment = await makePayment({
          token: "tok_visa",
          paymentAmount: details.amount,
          reservationDate: new Date(details.date).toISOString().split('T')[0],
          ...payload
        });
        if (payment.status == "success") {
          successNotification(payment.message);
          history.push("/orders");
        } else {
          errorNotification(payment.message);
        }
      } else {
        errorNotification(response.message);
      }
      setloading(false);
    }
  };

  if (!details) {
    return <div>Loading or no reservation details available...</div>;
  }

  return (
    <Formik
      initialValues={{
        numberOfGuests: 1,
      }}
      enableReinitialize={true}
      onSubmit={(values, { resetForm, errors }) => {
        window.scrollTo(0, 0);
        handlePayment(values);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        values,
        touched,
        errors,
      }) => {
        console.log("Formik values:", values);
        return (
          <Form onSubmit={handleSubmit} className="mt-8">
            <div className="w-full min-h-screen">
              <div
                className="hidden md:block bg-BLUE-_400 fixed py-14 px-8 min-h-full"
                style={{ width: "30%" }}
              >
                <Text color="font-bold text-white pt-20" variant="h2">
                  A few clicks away from booking an{" "}
                  <span className="italic">order</span>
                </Text>
                <div className="pt-12">
                  <Text color="font-normal text-BLUE-_200" variant="h4">
                    Here we go!!
                  </Text>
                </div>
              </div>
              <div className="py-4 md:py-14 md:px-20 px-4 min-h-full bg-BACKGROUND_LIGHT businessDetails">
                <div className="my-8 bg-white shadow-md p-8 w-full md:w-5/6">
                  <h2 className="text-2xl font-bold mb-4">
                    {details.VenueName}
                  </h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Item label="Location" value={details.Location} />
                    </Grid>
                    <Grid item xs={12}>
                      <Item label="Type" value={details.VenueType} />
                    </Grid>
                    <Grid item xs={12}>
                      <Item label="Amount" value={`$${details.amount}`} />
                    </Grid>
                    <Grid item xs={12}>
                      <Item
                        label="Date"
                        value={new Date(details.date).toLocaleDateString()}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Item
                        label="Time"
                        value={`${details.start_time} - ${details.end_time}`}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Item label="Status" value={details.status} />
                    </Grid>
                    <Grid item xs={12}>
                      <Item label="Capacity:" value={details.Capacity} />
                    </Grid>
                  </Grid>

                  <MyInput
                    name="numberOfGuests"
                    type="number"
                    placeholder="Number Of Guests"
                    label="Number Of Guests"
                    handleChange={handleChange}
                  />
                  <div className="mt-6">
                    <CardElement />
                    <div className="flex justify-end mt-6">
                      <Button
                        isLoading={loading}
                        disabled={loading}
                        title="Pay with Stripe"
                        size="medium"
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const WrappedMakeReservation = () => (
  <Elements stripe={stripePromise} options={options}>
    <MakeReservation />
  </Elements>
);

export { WrappedMakeReservation };
