import React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../components/Table";
import LongMenu from "./components/actionMenu";
import SideModal from "../../../components/modals";
import Editvenue from "./Details/components/editVenueAvalability";
import AvailabiltyService from "../../../services/availabilty.service";
import { useDispatch, useSelector } from "react-redux";
import { addReservation, addVenues } from "../../../store/reservationSlice";
import { Chip } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import VenuesService from "../../../services/venue.service";
import { isAdminOrSuperAdmin } from "../../../helper/utils";

const options = [
  { title: "Edit", value: "Edit" },
  { title: "Delele", value: "Delete" },
];


const actionItems = ["Email", "Firstname", "Lastname"];

const VenuesAvailability = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const [venues, setVenue] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [venueData, setvenueData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [changeTab, setChangeTab] = useState("");

  const { fetchAllAvailbility, getAvailabilityByDateTime, editAvailabilty } =
    AvailabiltyService();
    const { fetchVenus } = VenuesService();

  const onGetVenuesAvailability = async () => {
    setIsLoading(true);
    const allVenus = await fetchAllAvailbility(changeTab);
    if (allVenus?.modelList) setvenueData(allVenus?.modelList);
    setIsLoading(false);
  };

  const onGetVenues = async () => {
    const allVenus = await fetchVenus('');
    if (allVenus?.modelList){
      dispatch(addVenues(allVenus.modelList))
      console.log("allVenus=========",allVenus)
    }
  };

  useEffect(() => {
    onGetVenues()
  },[])

  useEffect(() => {
    onGetVenuesAvailability();
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

  const changeSearchParams = (value) => {};

  const handleOpenResponseModal = () => {
    onGetVenuesAvailability();
  };

  const handleSearch = (event) => {};

  // console.log(actionData);
  const actions = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "available",
    },
    {
      id: 3,
      title: "booked",
    },
  ];

  const changeActions = (item) => {
    setActiveTab(item);
    switch (item) {
      case "All":
        setChangeTab("");
        setPaginationNumber(1);
        break;
      case "available":
        setChangeTab("available");
        setPaginationNumber(1);
        break;
      case "booked":
        setChangeTab("booked");
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
          <div className="flex items-center">
            <div className="flex flex-col">
              <Link to={`/Venues/${item?.id}`}>
                <p className="text-sm cursor-pointer text-NEUTRAL-_900">
                  {`${item?.VenueName}`}
                </p>
              </Link>
            </div>
          </div>
        ),
        VenueType: (
          <p className="text-NEUTRAL-_900 text-sm">{item?.VenueType}</p>
        ),
        Location: <p className="text-NEUTRAL-_900 text-sm">{item?.Location}</p>,
        Capacity: <p className="text-NEUTRAL-_900 text-sm">{item?.Capacity}</p>,
        date: (
          <p className="text-NEUTRAL-_900 text-sm">
            {new Date(item?.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ),

        start_time: (
          <p className="text-NEUTRAL-_900 text-sm">{item?.start_time}</p>
        ),
        end_time: <p className="text-sm text-TITLE ">{item?.end_time}</p>,
        view: (
          <Chip
            sx={{
              backgroundColor: "blue",
              color: "#fff",
            }}
            disabled={item.status === "booked"}
            label="Make reservation"
            variant="outlined"
            onClick={() => {
              dispatch(addReservation(item));
              history.push("/make-reservation");
            }}
          />
        ),
        status: (
          <span
            className="text-TITLE p-2 rounded-2xl text-xs"
            style={
              item?.status === "available"
                ? { backgroundColor: "#E2FEF0" }
                : { backgroundColor: "#EDF2F7" }
            }
          >
            {item?.status}
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
      { Header: "Venue Name", accessor: "VenueName" },
      { Header: "Venue Type", accessor: "VenueType" },
      { Header: "Capacity", accessor: "Capacity" },
      { Header: "Available Date", accessor: "date" },
      { Header: "Start time", accessor: "start_time" },
      { Header: "End time", accessor: "end_time" },
      { Header: "Status", accessor: "status" },
      { Header: "", accessor: "view" },
      { Header: "", accessor: "actions" },
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

export { VenuesAvailability };
