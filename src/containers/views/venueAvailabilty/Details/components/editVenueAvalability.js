import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import ErrorMessage from "../../../multiStepViews/fields/Error";
import SearchableSelect from "../../../multiStepViews/fields/SearchableSelect";
import MyInput from "../../../multiStepViews/fields/Input";
import Button from "../../../../../components/forms/Button";
import { errorNotification, successNotification } from "../../../../../services/helper/toastNotification";
import AvailabiltyService from "../../../../../services/availabilty.service";

const EditVenue = ({ data,closeModal, callback }) => {
  const { updateAvailabilityStatus } = AvailabiltyService();
  const [loading, setloading] = useState(false);

  const venueValidationSchema = Yup.object().shape({
    venueName: Yup.string()
      .trim()
      .required('Venue name is required.'),
    venueType: Yup.string()
      .oneOf(['Hotel', 'Restaurant', 'EventSpace'], 'Invalid venue type.')
      .required('Venue type is required.'),
    location: Yup.string()
      .trim()
      .required('Location is required.'),
    description: Yup.string()
      .trim()
      .max(500, 'Description cannot exceed 500 characters.'),
    capacity: Yup.number()
      .positive('Capacity must be a positive number.')
      .integer('Capacity must be an integer.')
      .optional(),
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const statusTypeOptions = [
    { value: 'available', label: 'Available' },
    { value: 'booked', label: 'Booked' },
  ];
  

  const handleClose = () => {
    closeModal(false);
    callback();
  };

  const submitForm = async (values) => {
    const status = {
      status: values.status
    }
    try {
      setloading(true);
      const result = await updateAvailabilityStatus(status,data.id);
      setloading(false);
      if (result.status !== "success") {
        errorNotification(result.message);
      } else {
        successNotification(result.message);
        handleClose();
      }
    } catch (error) {
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

      <h3 className="text-2xl mb-7">Edit Availability</h3>
      <Formik
        initialValues={{
          venue_id: data.venue_id || '',
          date: formatDate(data.date) || '',
          start_time: data.start_time || '',
          end_time: data.end_time || '',
          status: data.status || "",
        }}
       // validationSchema={venueValidationSchema}
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
          console.log("Formik values:", values);
          return (
            <Form onSubmit={handleSubmit} className="mt-8">
              <div className="mb-5">
                <label className="text-sm font-medium pb-2">Availabilty status</label>
                <SearchableSelect
                  options={statusTypeOptions}
                  name="status"
                  value={values.status}
                  setFieldValue={setFieldValue}
                  placeholder="Select status"
                />
                <ErrorMessage error={errors.status} touched={touched.status} />
              </div>
              <MyInput
                name="date"
                type="date"
                placeholder="Available date"
                label="Available date"
                handleChange={handleChange}
                disabled
              />
              <MyInput
                name="start_time"
                type="time"
                placeholder="Start time"
                label="Start time"
                handleChange={handleChange}
                disabled
              />
              <MyInput
                name="end_time"
                placeholder="end_time"
                type="time"
                label="End time"
                handleChange={handleChange}
                disabled
              />
              <div className="flex justify-end">
                <Button
                  isLoading={loading}
                  disabled={loading}
                  title="Edit availability"
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

export default EditVenue;
