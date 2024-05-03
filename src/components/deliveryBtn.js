import React from "react";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useQuery } from "react-query";
import { api } from "../services/api";
import UrlRoute from "../services/helper/UrlRouter";
import tokenService from "../services/token.service";
import SearchableSelect from "../containers/views/multiStepViews/fields/SearchableSelect";

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

export default function CustomizedMenus({ setSelectedWarehouse }) {
  const userObj = tokenService.getUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const warehouseInfo = JSON.parse(
    window.localStorage.getItem("warehouseInfo")
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isLoading: warehouseLoading, data: getAllWarehouse } = useQuery({
    queryKey: "getWarehouses",
    queryFn: () =>
      api.get(
        `${UrlRoute.getAllWarehouses}0&pageSize=1000&partnerId=${userObj?.clientId}`
      ),
  });

  const allWarehouses = getAllWarehouse?.data?.content.map((user) => {
    return {
      label: user.name,
      value: {
        id: user.id,
        name: user.name,
        address: user.address,
        contactEmail: user.contactEmail,
        contactPerson: user.contactPerson,
        contactPhone: user.contactPhone,
      },
    };
  });

  const submitForm = (values) => {
    const data = {
      id: values.id,
      name: values.name,
      address: values.address,
      contactEmail: values.contactEmail,
      contactPerson: values.contactPerson,
      contactPhone: values.contactPhone,
    };
    setSelectedWarehouse(values);
    localStorage.setItem("warehouseInfo", JSON.stringify(data));
  };

  return (
    <div className="min-w-100px">
      <Formik
        initialValues={{
          warehouses: "",
        }}
        onSubmit={(values, { resetForm, errors }) => {
          window.scrollTo(0, 0);
          submitForm(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit} className="mt-8">
            <SearchableSelect
              options={allWarehouses}
              name="warehouses"
              value={values.warehouses}
              setFieldValue={setFieldValue}
              placeholder="Warehouses"
              isLoading={warehouseLoading}
              extraFunction={submitForm}
              defaultValue={warehouseInfo?.name}
            />
          </Form>
        )}
      </Formik>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          ...
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
