import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {},
  venues: []
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addReservation: (state, action) => {
      // Generate a random float between 200 and 1000
      const randomAmount = Math.random() * (1000 - 200) + 200;

      // Update the reservation details with the random amount rounded to two decimal places
      state.details = {
        ...action.payload,
        amount: Math.round(randomAmount * 100) / 100, // Round to two decimal places
      };
    },
    addVenues: (state, action) => {
      state.venues = [...action.payload];
    },
    removeReservation: (state, action) => {
      state.details = {};
    },
  },
});

export const { addReservation, addVenues, removeReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
