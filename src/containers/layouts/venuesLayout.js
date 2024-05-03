import { useState } from "react";
import InappLayout from "./inappLayout";
import Text from "../../components/Typography/Typography";
import Button from "../../components/forms/Button";
import SideModal from "../../components/modals";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import AddVenue from "../views/venues/Details/components/addVenue";
import { isAdminOrSuperAdmin } from "../../helper/utils";



const VenuesLayout = ({ children, ...props }) => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openSucessModal, setOpenSucessModal] = useState(false);
  const handleOpenResponseModal = () => {
    setOpenSucessModal(true);
  };
  return (
    <InappLayout {...props}>
      <div className="p-6">
        <Breadcrumb
          className="mb-3"
          links={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "Venues", link: "#" },
          ]}
        />
        <SideModal
          children={
            <AddVenue
              closeModal={setOpenInviteModal}
              callback={handleOpenResponseModal}
            />
          }
          isOpen={openInviteModal}
        />
        <div className="flex justify-between">
          <Text color="font-bold font-medium not-italic" variant="h2">
            Venues
          </Text>
         {isAdminOrSuperAdmin() && <div>
            <Button
              className="px-3 rounded-2xl"
              title="Add Venue"
              backgroundColor="#3C48FC"
              onClick={setOpenInviteModal}
              isPlus={true}
            />
          </div>}
        </div>
        {children}
      </div>
    </InappLayout>
  );
};

export default VenuesLayout;
