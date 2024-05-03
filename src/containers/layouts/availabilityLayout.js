import { useState } from "react";
import InappLayout from "./inappLayout";
import Text from "../../components/Typography/Typography";
import Button from "../../components/forms/Button";
import SideModal from "../../components/modals";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";
import CreateVenueAvailability from "../views/venueAvailabilty/Details/components/addAvailability";
import { isAdminOrSuperAdmin } from "../../helper/utils";


const AvailabiltyLayout = ({ children, ...props }) => {
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
            <CreateVenueAvailability
              closeModal={setOpenInviteModal}
              callback={handleOpenResponseModal}
            />
          }
          isOpen={openInviteModal}
        />
        <div className="flex justify-between">
          <Text color="font-bold font-medium not-italic" variant="h2">
            Venues availability
          </Text>
         {isAdminOrSuperAdmin() && <div>
            <Button
              className="px-3 rounded-2xl"
              title="Add Availability"
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

export default AvailabiltyLayout;
