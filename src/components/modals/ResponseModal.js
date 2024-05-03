import React from "react";
import { makeStyles } from "@mui/styles";
import { Modal, Backdrop, Button, Paper } from "@mui/material";
import Slide from "@mui/material/Slide";
import ErrorIcon from '@mui/icons-material/Error';
import ClearIcon from '@mui/icons-material/Clear';

import successCheck from "../../assets/images/successCheck.svg";
import Text from "../../components/Typography/Typography";
import CreatedIcon from "../../assets/images/created.svg"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    maxWidth: 500,
    padding: 7,
    borderRadius: 7,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  button:{
    color:'#fff',
    background: "#3C48FC",
    textTransform: 'none',
    borderRadius:4,
    '&:hover':{
        backgroundColor: "#3C48FC",
    },
  }
}));

export default function TransitionsModal({
  openDialog,
  closeModal,
  textMessage,
  subTextMessage,
  buttonText,
  status
}) {
  const classes = useStyles();
  const handleClose = () => {
    closeModal();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDialog ?? false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={openDialog ?? false}>
          <Paper className={classes.paper}>
            <div className={classes.center}>
              <div className="flex justify-center items-center flex-col p-6">
                <div className="flex justify-center items-center">
                 {status === "sucess" && <img src={successCheck} alt="img" />}
                  {status === "failed" && <ErrorIcon
                   color='error'
                   sx={{
                    width:118,
                    height:92,
                   }}
                  />}
                </div>
                <Text
                  format="mt-10 text-center"
                  variant="h3"
                  color="text-PRIMARY-_700"
                  weight="bold"
                >
                  {textMessage}
                </Text>
                <div className="flex items-center mb-4 mt-4 ">
                  {status === "sucess" && <img src={CreatedIcon} alt="CreatedIcon" className="mr-2"/>}
                 { status === "sucess" && <ClearIcon color="error" className="mr-2"/>}
                  <Text
                  variant="small"
                  format="text-center"
                  color="text-NEUTRAL-_600"
                  weight="normal"
                >
                  {subTextMessage}
                </Text>
                </div>
                <Button 
             className={classes.button}
             variant="contained"
             size="small"
             onClick={handleClose}
             >{buttonText}</Button>
              </div>
            </div>
          </Paper>
        </Slide>
      </Modal>
    </div>
  );
}
