import React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../components/Table";

import ReservationService from "../../../services/reservation.service";


const actionItems = [];

const AllReservations = () => {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const [ordersData, setOrdersData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [changeTab, setChangeTab] = useState("");

  const {fetchAllReservations } =
    ReservationService();

  const onGetReservations = async () => {
    setIsLoading(true);
    const allVenus = await fetchAllReservations();
    if (allVenus?.modelList) setOrdersData(allVenus?.modelList);
    setIsLoading(false);
  };

  useEffect(() => {
    onGetReservations();
  }, [paginationNumber, changeTab]);

  console.log("ordersData....",ordersData)

  const handlePaginationChange = (e, page) => {
    setPaginationNumber(page);
  };

  const changeSearchParams = (value) => {};

  const handleSearch = (event) => {};

  // console.log(actionData);
  const actions = [
    {
      id: 1,
      title: "All",
    },
  ];

  const changeActions = (item) => {
    setActiveTab(item);
    switch (item) {
      case "All":
        setChangeTab("");
        setPaginationNumber(1);
        break;
      default:
        setChangeTab("");
        setPaginationNumber(1);
        break;
    }
  };

  const getData = useCallback(() => {
    const result = ordersData.map((item, i) => {
      return {
        venueName: (
          <div className="flex items-center">
            <div className="flex flex-col">
              <Link to="#">
                <p className="text-sm cursor-pointer text-NEUTRAL-_900">
                  {`${item?.venueName}`}
                </p>
              </Link>
            </div>
          </div>
        ),
        reservationDate: (
          <p className="text-NEUTRAL-_900 text-sm">
            {new Date(item?.reservationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ),
        startTime: (
          <p className="text-NEUTRAL-_900 text-sm">{item?.startTime}</p>
        ),
        endTime: <p className="text-sm text-TITLE ">{item?.endTime}</p>,
        numberOfGuests: (
          <p className="text-sm text-TITLE ">{item?.numberOfGuests}</p>
        ),
        amount: <p className="text-sm text-TITLE ">{item?.amount}</p>,
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
        view: (
          <div></div>
        ),
        status: (
          <span
            className="text-TITLE p-2 rounded-2xl text-xs"
            style={
              item?.status === "Confirmed"
                ? { backgroundColor: "#E2FEF0" }
                : { backgroundColor: "#EDF2F7" }
            }
          >
            {item?.status}
          </span>
        ),
        actions: <div className=""></div>,
      };
    });
    return [...result];
  }, [ordersData]);

  const columns = useMemo(
    () => [
      { Header: "Venue Name", accessor: "venueName" },
      { Header: "Event Date", accessor: "reservationDate" },
      { Header: "Start time", accessor: "startTime" },
      { Header: "End time", accessor: "endTime" },
      {
        Header: "Price",
        accessor: "amount",
      },
      { Header: "Status", accessor: "status" },
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

export { AllReservations };
