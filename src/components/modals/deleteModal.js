import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../forms/Button";
import { Dialog } from "@mui/material";

export default function AlertDialog({
  handleClose,
  onSubmit,
  open,
  title,
  content,
  isLoading,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} title="No" />
          <Button
            backgroundColor="red"
            onClick={onSubmit}
            autoFocus
            title="Yes"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
