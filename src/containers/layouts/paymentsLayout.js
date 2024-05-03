import InappLayout from "./inappLayout";
import Text from "../../components/Typography/Typography";
import Button from "../../components/forms/Button";
import Breadcrumb from "../../components/Breadcrumb/breadcrumb";


const PaymentsLayout = ({ children, ...props }) => {
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
            All Payments
          </Text>
        </div>
        {children}
      </div>
    </InappLayout>
  );
};

export default PaymentsLayout;
