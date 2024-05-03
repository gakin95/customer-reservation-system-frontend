import { makeStyles } from "@mui/styles";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import CloseIcon from "../../assets/images/close.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiDialogTitle-root": {
      backgroundColor: "#F89B5F",
    },
    "& .MuiDialog-container": {
      background: "rgba(255, 255, 255, 0.25)",
    },
    "& .MuiDialog-paperFullScreen": {
      width: "70%",
    },
  },
}));

const DetailsModal = ({ open, handleClose, children, ...props }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen={true}
        className={classes.root}
        open={open ?? false}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Slide in={true}>
          <div
            className="h-full p-6"
            id="scroll-dialog-description"
            ref={props.descriptionElementRef}
            tabIndex={-1}
          >
            <div className="flex item-center justify-end mb-6">
              <img
                src={CloseIcon}
                className="h-8 w-8 cursor-pointer"
                alt="CloseIcon"
                onClick={handleClose}
              />
            </div>
            <main>{children}</main>
          </div>
        </Slide>
      </Dialog>
    </div>
  );
};

export default DetailsModal;
