import React from 'react';
import clsx from "clsx"
import { makeStyles } from '@mui/styles';

const Item = ({ label, value, className }) => {
  const classes = useStyles();
  return (
    <div>
      <label>{label}</label>
      <div
        className={clsx(classes.bgText, !label && classes.noLabel, className)}
      >
        <p>{value || value === 0 ? value : 'Nil'}</p>
      </div>
    </div>
  );
};

export default Item;

const useStyles = makeStyles((theme) => ({
  bgText: {
    backgroundColor: "#3C48FC",
    padding: ".5rem",
    color: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
    width: "100%",
  },
  noLabel: {
    width: "90%",
  },
}));
