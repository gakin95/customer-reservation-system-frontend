import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import ErrorMessage from "../../../multiStepViews/fields/Error";
import SearchableSelect from "../../../multiStepViews/fields/SearchableSelect";
import MyInput from "../../../multiStepViews/fields/Input";
import Button from "../../../../../components/forms/Button";
import VenuesService from "../../../../../services/venue.service";
import { errorNotification, successNotification } from "../../../../../services/helper/toastNotification";

const EditVenue = ({ data,closeModal, callback }) => {
  const { editVenue } = VenuesService();
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

  const venueTypeOptions = [
    { value: 'Hotel', label: 'Hotel' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'EventSpace', label: 'Event Space' } // Label can be different from value if needed
  ];
  

  const handleClose = () => {
    closeModal(false);
    callback();
  };

  const submitForm = async (values) => {
    try {
      setloading(true);
      const result = await editVenue(values,data.VenueID);
      setloading(false);
      if (result.status !== "success") {
        errorNotification(result.message);
      } else {
        successNotification(result.message);
        handleClose();
      }
    } catch (error) {
      errorNotification("Failed to add venue");
      handleClose();
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

      <h3 className="text-2xl mb-7">Edit Venue</h3>
      <Formik
        initialValues={{
          venueName: data.VenueName || '',
          venueType: data.VenueType || '',
          location: data.Location || '',
          description: data.Description || '',
          capacity: data.Capacity || ''
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
          console.log("Formik values:", values);
          return (
            <Form onSubmit={handleSubmit} className="mt-8">
              <MyInput
                name="venueName"
                placeholder="Venue Name"
                label="Venue Name"
                handleChange={handleChange}
              />
              <div className="mb-5">
                <label className="text-sm font-medium pb-2">Venue Type</label>
                <SearchableSelect
                  options={venueTypeOptions}
                  name="venueType"
                  value={values.venueType}
                  setFieldValue={setFieldValue}
                  placeholder="Select Venue Type"
                />
                <ErrorMessage error={errors.venueType} touched={touched.venueType} />
              </div>
              <MyInput
                name="location"
                placeholder="Location"
                label="Location"
                handleChange={handleChange}
              />
              <MyInput
                name="description"
                as="textarea"
                placeholder="Description"
                label="Description"
                handleChange={handleChange}
              />
              <MyInput
                name="capacity"
                placeholder="Capacity"
                type="number"
                label="Capacity"
                handleChange={handleChange}
              />
              <div className="flex justify-end">
                <Button
                  isLoading={loading}
                  disabled={loading}
                  title="Add Venue"
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
