import React from 'react';
import Rating from '@mui/material/Rating';

const HoverRating = ({ rating, onChange, venueId, userId }) => {
  return (
    <Rating
      name="hover-feedback"
      value={rating}
      precision={0.5}
      onChange={(event, newValue) => {
        onChange(newValue, venueId, userId);
      }}
    />
  );
};

export default HoverRating;
