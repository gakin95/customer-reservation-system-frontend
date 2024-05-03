import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Landing,
  Venues,
  VenueDetails,
  VenuesAvailability,
  Reservations,
  AllReservations,
  WrappedMakeReservation,
  DashboardScreen,
  Reports,
  PageNotFound,
  Login,
  Forbidden,
  Payments,
  Users,
} from "../containers/views";

//Layouts
import DashboardLayout from "../containers/layouts/inappLayout";
import VenuesLayout from "../containers/layouts/venuesLayout";
import PageNotFoundLayout from "../containers/layouts/PageNotFoundLayout";
import ProtectedRoute from "./ProtectedRoute";
import AvailabiltyLayout from "../containers/layouts/availabilityLayout";
import ReservationsLayout from "../containers/layouts/reservationsLayout";
import PaymentsLayout from "../containers/layouts/paymentsLayout";



const AppRoute = ({
  component: Component,
  exact,
  layout: Layout,
  path,
  title,
  ...rest
}) => (
  <Route
    {...rest}
    exact
    title
    path={path}
    key={path}
    render={(props) => (
      <Layout {...props}>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        
        <Route path="/onboarding" component={Landing} />
        <ProtectedRoute
          path="/dashboard"
          component={DashboardScreen}
          layout={DashboardLayout}
        />
        <ProtectedRoute
          path="/403"
          component={Forbidden}
          layout={DashboardLayout}
        />
        <ProtectedRoute
          path="/Reports"
          component={Reports}
          layout={DashboardLayout}
        />
        <ProtectedRoute
          path="/Venues"
          exact={true}
          component={Venues}
          layout={VenuesLayout}
        />
        <ProtectedRoute
          path="/Venues/:id"
          component={VenueDetails}
          layout={DashboardLayout}
        />
         <ProtectedRoute
          path="/availability"
          exact={true}
          component={VenuesAvailability}
          layout={AvailabiltyLayout}
        />
         <ProtectedRoute
          path="/orders"
          exact={true}
          component={Reservations}
          layout={ReservationsLayout}
        />
         <ProtectedRoute
          path="/all-bookings"
          exact={true}
          component={AllReservations}
          layout={DashboardLayout}
        />
         <ProtectedRoute
          path="/payments"
          exact={true}
          component={Payments}
          layout={PaymentsLayout}
        />
        <ProtectedRoute
          path="/users"
          exact={true}
          component={Users}
          layout={DashboardLayout}
        />
        <Route path="/make-reservation" component={WrappedMakeReservation} />
        <AppRoute component={PageNotFound} layout={PageNotFoundLayout} />
      </Switch>
    </Router>
  );
}


