import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyInput from "../../../multiStepViews/fields/Input";
import Button from "../../../../../components/forms/Button";
import { errorNotification, successNotification } from "../../../../../services/helper/toastNotification";
import AvailabiltyService from "../../../../../services/availabilty.service";
import { useSelector } from "react-redux";
import SearchableSelect from "../../../multiStepViews/fields/SearchableSelect";
import ErrorMessage from "../../../multiStepViews/fields/Error";

const CreateVenueAvailability = ({ closeModal, callback }) => {
  const { addAvailabilty } = AvailabiltyService();
  const [loading, setloading] = useState(false);
  const venues = useSelector((state) => state.reservationData.venues);
  const venuesOptions = venues?.map(el => {
   return {
    value: el.VenueID,
    label: el.VenueName
   }
  })
  console.log("---------",venues)
  const venueValidationSchema = Yup.object().shape({
    venue_id: Yup.number().required("Venue ID is required").integer(),
    date: Yup.date().required("Date is required").min(new Date(), `"date" should be today or in the future`),
    start_time: Yup.string().required("Start time is required").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format"),
    end_time: Yup.string().required("End time is required").matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format")
        .test('is-greater', 'Start time must be less than end time', function(value) {
            const { start_time } = this.parent;
            return new Date(`1970-01-01T${start_time}:00`) < new Date(`1970-01-01T${value}:00`);
        }),
    status: Yup.string().required("Status is required").oneOf(['available', 'booked'])
});


  const statusTypeOptions = [
    { value: 'available', label: 'Available' },
    { value: 'booked', label: 'Booked' },
  ];
  

  const handleClose = () => {
    closeModal(false);
    callback();
  };

  const submitForm = async (values) => {
    try {
      setloading(true);
      const modifiedValues = {
        ...values,
        start_time: `${values.start_time}:00`,
        end_time: `${values.end_time}:00`
      };
      const result = await addAvailabilty(modifiedValues);
      console.log("result",result)
      setloading(false);
      if (result.status !== "success") {
        errorNotification(result.message);
      } else {
        successNotification(result.message);
        handleClose();
      }
    } catch (error) {
      console.log("-----errgg",error.data)
      errorNotification("Failed to add venue");
      //handleClose();
    }
  };


  return (
    <div>
      <div
        className="fixed top-10 right-5 font-lg"
        onClick={() => closeModal(false)}
      >
        <div
        className="fixed top-10 right-5 font-lg"
        onClick={() => closeModal(false)}
      >
        <svg
          width="13"
          height="14"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.68721 9.86008C8.94175 10.1044 9.35443 10.1044 9.60897 9.86008C9.86359 9.61575 9.86359 9.21954 9.60897 8.97522L5.92178 5.43586L9.60905 1.89652C9.86358 1.65218 9.86358 1.25603 9.60905 1.01169C9.35443 0.767345 8.94175 0.767345 8.68721 1.01169L4.99994 4.551L1.31268 1.01169C1.05813 0.767353 0.645418 0.767353 0.390865 1.01169C0.136313 1.25604 0.136313 1.6522 0.390865 1.89654L4.0781 5.43586L0.390874 8.97522C0.136321 9.21954 0.136321 9.61567 0.390874 9.86008C0.645426 10.1044 1.05813 10.1044 1.31269 9.86008L4.99994 6.32072L8.68721 9.86008Z"
            fill="#3F434A"
          />
        </svg>
      </div>
      </div>

      <h3 className="text-2xl mb-7">Create Availability</h3>
      <Formik
        initialValues={{
          venue_id: '',
          date: '',
          venue_id:'',
          start_time: '',
          end_time: '',
          status: "available",
        }}
        validationSchema={venueValidationSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm, errors }) => {
          window.scrollTo(0, 0);
          submitForm(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
        })  => {
          return (
            <Form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-5">
              <label className="text-sm font-medium pb-2">Venue</label>
              <SearchableSelect
                options={venuesOptions}
                name="venue_id"
                value={values.venue_id}
                setFieldValue={setFieldValue}
                placeholder="Select Venue"
              />
              <ErrorMessage error={errors.venue_id} touched={touched.venue_id} />
            </div>
              <MyInput
                name="date"
                type="date"
                placeholder="Available date"
                label="Available date"
                handleChange={handleChange}
              />
              <MyInput
                name="start_time"
                type="time"
                placeholder="Start time"
                label="Start time"
                handleChange={handleChange}
              />
              <MyInput
                name="end_time"
                placeholder="end_time"
                type="time"
                label="End time"
                handleChange={handleChange}
              />
              <div className="flex justify-end">
                <Button
                  isLoading={loading}
                  disabled={loading}
                  title="Submit"
                  size="medium"
                  type="submit"
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default CreateVenueAvailability;
