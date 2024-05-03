import InappLayout from "./inappLayout";
import Text from "../../components/Typography/Typography";
import Button from "../../components/forms/Button";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";


const ReservationsLayout = ({ children, ...props }) => {
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
        <div className="flex justify-between">
          <Text color="font-bold font-medium not-italic" variant="h2">
            My Bookings
          </Text>
          <div>
            <Button
              className="px-3 rounded-2xl"
              title="Make Reservation"
              backgroundColor="#3C48FC"
              onClick={() => props.history.push("/availability")}
              isPlus={true}
            />
          </div>
        </div>
        {children}
      </div>
    </InappLayout>
  );
};

export default ReservationsLayout;
