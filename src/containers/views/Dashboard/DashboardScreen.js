import AssetImg from "../../../assets/images/asset.svg";
import UserImage from "../../../assets/images/img.svg";
import teamBg from "../../../assets/images/teamBg.svg";
import UserImg from "../../../assets/images/user1.svg";
import vehicleBg from "../../../assets/images/vehicleBg.svg";
import warehouseBg from "../../../assets/images/warehouseBg.svg";
import WelcomeBgImg from "../../../assets/images/welcomebg.svg";
import { DashboardCard } from "../../../components/cards";
import Text from "../../../components/Typography/Typography";
import tokenService from "../../../services/token.service";
import { isFulfillment, isDelivery, isAuthenticated, isAdminOrSuperAdmin } from "../../../helper/utils";

const DashboardScreen = () => {
  const userObj = tokenService.getUser();
  return (
    <div className="p-2 md:p-6">
      <div
        className="bg-white shadow-md p-8 h-1/4 bg-auto bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${WelcomeBgImg})` }}
      >
        <div>
          <Text color="font-bold pb-2 pt-2" variant="h2">
            Hi, {userObj?.firstName.toUpperCase()}{" "}
            {userObj?.lastName.toUpperCase()}
          </Text>
          <Text variant="h4" color="font-normal text-NEUTRAL-_600 w-96">
            We are cexcited to have you here.
          </Text>
        </div>
      </div>
      <div>
        <Text color="font-medium my-2" variant="h2">
          Get Started
        </Text>
        <Text variant="h4" color="font-medium text-gray-600 not-italic">
          Use this quick links to nagivate the app
        </Text>
      </div>
      <div className="flex flex-wrap items-center justify-around">
        {isAdminOrSuperAdmin() && <DashboardCard
          pathName="/users"
          title="Manage users"
          subTitle="View the lists of users"
          image={UserImg}
          buttonText="View users"
          bgImage={teamBg}
        />}
        {isAuthenticated() && (
          <DashboardCard
            pathName="/Venues"
            title="Find venues"
            subTitle="Find a venue to make reservations"
            image={UserImage}
            buttonText="View venues"
            bgImage={warehouseBg}
          />
        )}
        {isAuthenticated() && (
          <DashboardCard
            pathName="/availability"
            title="Make reservation"
            subTitle="Make a reservation"
            image={AssetImg}
            buttonText="View available slots"
            bgImage={vehicleBg}
          />
        )}
      </div>
    </div>
  );
};

export { DashboardScreen };
