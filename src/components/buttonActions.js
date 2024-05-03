import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const useStyles = makeStyles({
  button: {
    backgroundColor: "#ffffff",
    border: "1px solid #3C48FC",
    textTransform: "capitalize",
    color: "#3C48FC",
  },
});

export default function CustomizedMenus({
  actionItems = ["All", "Active", "Retired"],
  setActionData,
  setPaginationNumber,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    // console.log("buttonActions", event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    // console.log("button", e.target.innerText);
    setActionData(e.target.innerText);
    //setPaginationNumber(1);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        color="inherit"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        className={classes.button}
      >
        Search
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actionItems.map((item, i) => (
          <MenuItem key={i} onClick={handleClose} disableRipple>
            {item}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
