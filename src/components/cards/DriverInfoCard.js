import { useState } from "react";
import Avatar from "@mui/material/Avatar";

import Text from "../../components/Typography/Typography";
import Email from "../../assets/images/email.svg";
import trash from "../../assets/icons/trash.svg";
import PhoneIcon from "../../assets/images/phone.svg";
import DeleteModal from "../../containers/views/warehouse/DeleteModal";

const DriverInfoCard = ({
  image,
  name,
  phoneNumber,
  email,
  show,
  ifTrashBin = false,
}) => {
  const [openRemoveUser, setOpenRemoveUser] = useState(false);

  const openModal = () => {
    setOpenRemoveUser(true);
  };
  const displayUser = () => {
    if (show) {
      return (
        <div className="p-2 border rounded border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <Avatar alt={name} src={image} sx={{ width: 32, height: 32 }} />
              <div className="ml-3">
                <Text variant="h4" color="not-italic font-medium">
                  {name}
                </Text>
              </div>
            </div>
            {ifTrashBin && (
              <img src={trash} alt="" className="cursor-pointer" onClick={openModal} />
            )}
          </div>
          {/* <div className="flex item-center"> */}
          <div className="flex mb-2">
            <div className="flex items-center mb-1 mr-10">
              <img src={PhoneIcon} alt={name} />
              <div className="ml-3">
                <Text
                  color="font-normal not-italic text-NEUTRAL-_500"
                  variant="body"
                >
                  Phone number
                </Text>
              </div>
            </div>
            <div className="flex items-center mb-1">
              <img src={Email} alt={name} />
              <div className="ml-3">
                <Text
                  color="font-normal not-italic text-NEUTRAL-_500"
                  variant="body"
                >
                  Mail
                </Text>
              </div>
            </div>
          </div>
          <div className="flex">
            <div>
              <Text color="text-xs font-normal not-italic text-PRIMARY-_500 mr-8">
                {phoneNumber}
              </Text>
            </div>
            <div>
              <Text color="text-xs font-normal not-italic text-PRIMARY-_500">
                {email}
              </Text>
            </div>
          </div>
          {/* </div> */}
          <DeleteModal
            title="  ⛔️ Remove User"
            question="Are you sure you want to remove this user?"
            info=" Proceeding to remove user means the user will be entirely removed from
            your warehouse"
            rejectModalOpen={openRemoveUser}
            deleteBtntext="Yes, Remove"
            setRejectModalOpen={setOpenRemoveUser}
          />
        </div>
      );
    }
    return null;
  };
  return <div>{displayUser()}</div>;
};

export default DriverInfoCard;
