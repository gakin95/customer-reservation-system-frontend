import React, { useState, useEffect } from "react";
import { Grid, Paper, Avatar} from "@mui/material";
import { styled } from "@mui/material/styles";
import Text from "../../../components/Typography/Typography";
import { Link } from "react-router-dom";
import Summary from "./components/Summary";
import AssetSummary from "./components/AssetSummary";
import EmptyState from "../../../components/EmptyState";
import Loading from "../../../components/Spinner/Loading";
import CalendarIcon from "../../../assets/images/Calendar.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useService from "../../../services/useService";
import UrlRoute from "../../../services/helper/UrlRouter";


const StyledCard = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  marginBottom: 10,
  boxShadow: "none",
}));

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const { getHandler } = useService()
  const [ratingsByVenues, setRatingsByVenues] = useState([]);
  const [venuesWithPerfect, setVenuesWithPerfectRating] = useState([]);
  const [paymentsByVenues, setPaymentsByVenues] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    (async() => {
      setLoading(true)
      const response = await getHandler(UrlRoute.reservation + '/get-summary');
      console.log("get-summary------",response.data)
      if (response?.data?.length > 0){
        setSummary(response.data[0])
      }
      setLoading(false)
    })()
  },[]);

  useEffect(() => {
    (async() => {
      setLoading(true)
      const response = await getHandler(UrlRoute.ratings + '/average-ratings');
      if (response?.data?.length > 0){
        setRatingsByVenues(response.data.map(item => {
          return {
            label: item.VenueName,
            value: item.AverageRating
          }
        }))
      }
      setLoading(false)
    })()
  },[]);
  useEffect(() => {
    (async() => {
      setLoading(true)
      const response = await getHandler(UrlRoute.ratings + '/perfect-ratings');
      if (response?.data?.length > 0){
        setVenuesWithPerfectRating(response.data.map(item => {
          return {
            label: item.VenueName,
            value: ""
          }
        }))
      }
      setLoading(false)
    })()
  },[]);
  useEffect(() => {
    (async() => {
      setLoading(true)
      const response = await getHandler(UrlRoute.payment + '/payments-by-venues');
      if (response?.data?.length > 0){
        setPaymentsByVenues(response.data)
      }
      setLoading(false)
    })()
  },[]);
   
  const renderVenuesByRatings = () => {
    if (loading) {
      return <Loading />;
    } else if (ratingsByVenues.length > 0) {
      return (
        <div>
          {ratingsByVenues.map((item, index) => (
            <div
              className={`py-6 ${
                ratingsByVenues.length - 1 !== index ? "border-b" : ""
              }`}
            >
              <AssetSummary key={index} label={item.label} value={item.value} />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full">
          <EmptyState
            mainEmptyStateText="No data available"
            subEmptyStateText=""
          />
        </div>
      );
    }
  };

  const renderVenuesWithPerfectRatings = () => {
    if (loading) {
      return <Loading />;
    } else if (venuesWithPerfect.length > 0) {
      return (
        <div>
          {venuesWithPerfect.map((item, index) => (
            <div
              className={`py-6 ${
                venuesWithPerfect.length - 1 !== index ? "border-b" : ""
              }`}
            >
              <AssetSummary key={index} label={item.label} value={item.value} />
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full">
          <EmptyState
            mainEmptyStateText="No data available"
            subEmptyStateText=""
          />
        </div>
      );
    }
  };

  
  const renderPaymentsByVenueNames = () => {
    if (loading) {
      return <Loading />;
    } else if (paymentsByVenues.length > 0) {
      return (
        <div>
          <div className="pb-6 border-b">
            <Text variant="h4" color="font-bold text-NEUTRAL-900">
              Payments by venue
            </Text>
          </div>
         {paymentsByVenues.map((item,i) => {
          return  <div key={i} className="flex items-center justify-between py-6 border-b">
          <div className="flex items-center">
            <Avatar>{i + 1}</Avatar>
            <div className="ml-2">
              <Text variant="h4" color="font-normal text-TITLE">
                {item.VenueName}
              </Text>
            </div>
          </div>
          <Text variant="h4" color="font-normal">
            {`$ ${item.TotalAmountCollected}`}
          </Text>
        </div>
         })}
        </div>
      );
    } else {
      return (
        <div className="w-full">
          <EmptyState
            mainEmptyStateText="No data available"
            subEmptyStateText=""
          />
        </div>
      );
    }
  };
  return (
    <div className="p-6">
      <Link to="/dashboard">
        <Text variant="small" format={`inline text-BLUE-_400`}>
          Dashboard
        </Text>
      </Link>
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center">
          <Text color="font-bold" variant="h2">
            Reports
          </Text>
          <Text variant="small" format={` mt-3 ml-1 text-TITLE`}>
            as at April 28, 2024
          </Text>
        </div>
        <StyledCard>
          <div className="flex items-center">
            <img src={CalendarIcon} className="mr-2" alt="" />
            <Text variant="h4" color="font-normal text-TITLE">
              Reports:
            </Text>
            <div className="flex items-center ml-2">
              <Text variant="h4" color="font-normal text-BLUE-_400">
                Today
              </Text>
              <KeyboardArrowDownIcon className="cursor-pointer" />
            </div>
          </div>
        </StyledCard>
      </div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="my-6"
      >
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Summary
              title="Total Users"
              postivity={false}
              value={summary?.TotalUsers || '0'}
              percentage="+3.5%"
              loading={loading}
            />
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Summary
              title="Total Venues"
              postivity={false}
              value={summary?.TotalVenues || '0'}
              percentage="+3.5%"
              loading={loading}
            />
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Summary
              title="Total Available Slots"
              postivity={false}
              value={summary?.TotalAvailableSlots || '0'}
              percentage="+3.5%"
              loading={loading}
            />
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Summary
              title="Total Reservations"
              postivity={true}
              value={summary?.TotalReservations || '0'}
              percentage="+3.5%"
              loading={loading}
            />
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Summary
              title="Total Payments"
              postivity={true}
              value={summary?.TotalPayments || '0'}
              percentage="+3.5%"
              loading={loading}
            />
          </StyledCard>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        className="my-6"
      >
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <div className="pb-6 border-b">
              <Text variant="h4" color="font-bold  text-NEUTRAL-900">
                Venues by average ratings
              </Text>
            </div>
            {renderVenuesByRatings()}
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <div className="pb-6 border-b">
              <Text variant="h4" color="font-bold text-NEUTRAL-900">
                Venues with perfect ratings
              </Text>
            </div>
            {renderVenuesWithPerfectRatings()}
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>{renderPaymentsByVenueNames()}</StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

export { Reports };
