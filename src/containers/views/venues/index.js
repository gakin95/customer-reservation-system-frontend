import React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Table } from "../../../components/Table";
import LongMenu from "./components/actionMenu";
import SideModal from "../../../components/modals";
import Editvenue from "./Details/components/editVenue";
import VenuesService from "../../../services/venue.service";
import { isAdminOrSuperAdmin } from "../../../helper/utils";
import { Chip } from "@mui/material";
import HoverRating from "../../../components/Ratings";
import { errorNotification, successNotification } from "../../../services/helper/toastNotification";


const options = [
  { title: "Edit", value: "Edit" },
  { title: "Delete", value: "Delete" },
];


const actionItems = ["Email", "Firstname", "Lastname"];

const Venues = (props) => {
  const userId = useSelector(state => state.user.details.UserID);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const [venues, setVenue] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [venueData, setVenueData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [changeTab, setChangeTab] = useState("");
  const { fetchVenus, addRating } = VenuesService();


  const onGetVenues = async () => {
    setIsLoading(true);
    const allVenus = await fetchVenus(changeTab);
    if (allVenus?.modelList) setVenueData(allVenus?.modelList);
    setIsLoading(false);
  };

  useEffect(() => {
    onGetVenues();
  }, [paginationNumber, changeTab]);

  const handlePaginationChange = (e, page) => {
    setPaginationNumber(page);
  };

  const handleOpenModal = (option, item) => {
    console.log(option);
    setVenue(item);
    if (option === "Edit") {
      setOpenEditModal(true);
    }
  };

  const handleOpenModalTwo = (option, item) => {
    setVenue(item);
    if (option === "Edit") {
      setOpenEditModal(true);
    } 
  };

  const changeSearchParams = (value) => {
  };

  const handleOpenResponseModal = () => {
    onGetVenues();
  };

  const handleSearch = (event) => {
    

  };

  const handleRatingChange = async (newRating, venueId) => {
    // Immediately update local state to reflect the new user rating
    setVenueData(prevVenueData => prevVenueData.map(venue => {
      if (venue.VenueID === venueId) {
        return { ...venue, rating: newRating };  // Update the rating property
      }
      return venue;
    }));

    // Construct the rating data object
    const ratingData = {
      userID: userId,
      venueID: venueId,
      rating: newRating
    };

    try {
      setIsLoading(true); // Start loading indication
      const response = await addRating(ratingData); // Simulate API call to add rating
      console.log('============response', response.status);
      
      if (response.status === 'success') {
        successNotification(response.message); // Assuming this function properly shows notifications
      } else {
        errorNotification(response.message); // Handle potential errors in response
      }
    } catch (error) {
      console.error("Failed to submit rating:", error);
      errorNotification("Failed to submit rating"); // General error notification
    } finally {
      setIsLoading(false); 
    }
  };


  // console.log(actionData);
  const actions = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Hotel",
    },
    {
      id: 3,
      title: "Restaurant",
    },
    {
      id: 4,
      title: "EventSpace",
    },
  ];

  const changeActions = (item) => {
    setActiveTab(item);
    switch (item) {
      case "All":
        setChangeTab("");
        setPaginationNumber(1);
        break;
      case "Hotel":
        setChangeTab("Hotel");
        setPaginationNumber(1);
        break;
      case "Restaurant":
        setChangeTab("Restaurant");
        setPaginationNumber(1);
        break;
      case "EventSpace":
          setChangeTab("EventSpace");
          setPaginationNumber(1);
          break;
      default:
        setChangeTab("");
        setPaginationNumber(1);
        break;
    }
  };



  const getData = useCallback(() => {
    const result = venueData.map((item, i) => {
      return {
        VenueName: (
          <div className="">
            <p className="text-sm cursor-pointer text-NEUTRAL-_900">
            {item.VenueName}
          </p>
          <HoverRating
            rating={item.rating || 0}  // Use the rating from venueData
            onChange={(newRating) => handleRatingChange(newRating, item.VenueID)}
          />
        </div>
        ),
        VenueType: <p className="text-NEUTRAL-_900 text-sm">{item?.VenueType}</p>,
        Location: <p className="text-NEUTRAL-_900 text-sm">{item?.Location}</p>,
        Description: <p className="text-sm text-TITLE ">{item?.Description}</p>,
        Capacity: <p className="text-sm text-TITLE ">{item?.Capacity}</p>,
        view: (
          <Chip
          sx={{
            backgroundColor: "blue",
            color: "#fff",
          }}
          label="Check Availability"
          variant="outlined"
          onClick={() => {
            props.history.push(`/Venues/${item?.VenueID}`);
          }}
        />
        ),
        status: (
          <span
            className="text-TITLE p-2 rounded-2xl text-xs"
            style={
              item?.isActive === true
                ? { backgroundColor: "#E2FEF0" }
                : { backgroundColor: "#EDF2F7" }
            }
          >
            {item?.isActive ? "Active" : "Inactive"}
          </span>
        ),
        actions: (
          <div className="">
            {isAdminOrSuperAdmin() && <LongMenu
                action={(e) => handleOpenModalTwo(e, item)}
                options={options}
              />}
          </div>
        ),
      };
    });
    return [...result];
  }, [venueData]);

  const columns = useMemo(
    () => [
      {
        Header: "Venue Name",
        accessor: "VenueName",
      },
      {
        Header: "Venue Type",
        accessor: "VenueType",
      },
      {
        Header: "Location",
        accessor: "Location",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
      {
        Header: "Capacity",
        accessor: "Capacity",
      },
      {
        Header: "",
        accessor: "view",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ],
    []
  );

  const data = useMemo(() => getData(), [getData]);

  return (
    <div className="w-full">
      <div className="flex border-b my-6">
        {actions.map((item) => {
          return (
            <div className="mr-4">
              <div
                className={`flex items-center mb-4 cursor-pointer ${
                  activeTab === item?.title ? "border-b-2 border-blue-500" : ""
                }`}
              >
                <p key={item.id} onClick={() => changeActions(item?.title)}>
                  {item?.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <SideModal
        children={
          <Editvenue
            data={venues}
            closeModal={setOpenEditModal}
            callback={handleOpenResponseModal}
          />
        }
        isOpen={openEditModal}
      />
      <div className="clear-both mt-8">
        <Table
          isLoading={isLoading}
          columns={columns}
          data={data}
          showChecked={true}
          setActionData={changeSearchParams}
          actionItems={actionItems}
          totalNumberOfPages={totalNumberOfPages}
          page={paginationNumber}
          placeholder="Search for a team member"
          className="w-full"
          handleSearch={handleSearch}
          handlePaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export { Venues };
