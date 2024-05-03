import React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../components/Table";


import ReservationService from "../../../services/reservation.service";
import { Chip } from "@mui/material";

const options = [
  { title: "Edit", value: "Edit" },
  { title: "Activate", value: "activate" },
];

const optionsTwo = [
  { title: "Edit", value: "Edit" },
  { title: "Deactivate", value: "deactivate" },
];

const actionItems = ["Email", "Firstname", "Lastname"];

const Payments = () => {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const [paymentData, setPaymentData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [changeTab, setChangeTab] = useState("");

  const { getPayments } = ReservationService();

  const onGetPayments = async () => {
    setIsLoading(true);
    const allPayments = await getPayments();
    console.log('--------------------------',allPayments)
    if (allPayments?.modelList) setPaymentData(allPayments?.modelList);
    setIsLoading(false);
  };

  useEffect(() => {
    onGetPayments();
  }, [paginationNumber, changeTab]);

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
    const result = paymentData.map((item, i) => {
      return {
        PaymentMethod: (
          <div className="flex items-center">
            <div className="flex flex-col">
              <Link to="#">
                <p className="text-sm cursor-pointer text-NEUTRAL-_900">
                  {`${item?.PaymentMethod}`}
                </p>
              </Link>
            </div>
          </div>
        ),
        PaymentDate: (
          <p className="text-NEUTRAL-_900 text-sm">
            {new Date(item?.PaymentDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ),
        Amount: (
          <p className="text-NEUTRAL-_900 text-sm">{item?.Amount}</p>
        ),
        PaymentStatus: (
          <span
            className="text-TITLE p-2 rounded-2xl text-xs"
            style={
              item?.PaymentStatus === "Completed"
                ? { backgroundColor: "#E2FEF0" }
                : { backgroundColor: "#EDF2F7" }
            }
          >
            {item?.PaymentStatus}
          </span>
        ),
        view: (
          <Chip
          sx={{
            backgroundColor: "blue",
            color: "#fff",
          }}
          disabled={!item.Receipt_Url}
          label="View Receipt"
          variant="outlined"
          onClick={() => {
            window.location = item.Receipt_Url
          }}
        />
        ),

        actions: (
          <div className="">
            
          </div>
        ),
      };
    });
    return [...result];
  }, [paymentData]);

  const columns = useMemo(
    () => [
      { Header: "Payment Method", accessor: "PaymentMethod" },
      {
        Header: "Payment Date",
        accessor: "PaymentDate",
      },
      {
        Header: "Amount",
        accessor: "Amount",
      },
      { Header: "PaymentStatus", accessor: "PaymentStatus" },
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


export { Payments };
