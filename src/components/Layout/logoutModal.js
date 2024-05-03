import React from "react";
import Text from "../../components/Typography/Typography";
import Button from "../../components/forms/Button";

function LogoutModal({ setOpenModal, handleLogout }) {
  return (
    <div className="text-center">
      <Text variant="h1" color="text-NEUTRAL-_900" weight="bold">
        Are you sure you want to log out? ⏳
      </Text>
      <div className="mt-6 flex justify-between mx-6">
        <Button
          size="small"
          backgroundColor="#fff"
          textColor="#05944F"
          title="Cancel"
          onClick={() => {
            setOpenModal(false);
          }}
          style={{ border: "1px solid #05944F", padding: "2px" }}
          className="mr-2"
        />
        <Button
          size="small"
          backgroundColor="#05944F"
          textColor="#fff"
          title="Logout"
          onClick={() => {
            setOpenModal(false);
            handleLogout();
          }}
          style={{ border: "1px solid #05944F", padding: "2px" }}
          className="ml-2"
        />
      </div>
    </div>
  );
}

export default LogoutModal;
