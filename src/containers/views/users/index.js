import React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../components/Table";
import LongMenu from "./components/actionMenu";
import UsersService from "../../../services/users.service";




const options = [
  { title: "Edit", value: "Edit" },
  { title: "Activate", value: "activate" },
];

const optionsTwo = [
  { title: "Edit", value: "Edit" },
  { title: "Deactivate", value: "deactivate" },
];

const actionItems = ["Email", "Firstname", "Lastname"];

const Users = () => {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const [users, setUsers] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [venueData, setUsersData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [changeTab, setChangeTab] = useState("");

  const { fetchUsers } = UsersService();

  const onGetUsers = async () => {
    setIsLoading(true);
    const allVenus = await fetchUsers(changeTab);
    if (allVenus?.modelList) setUsersData(allVenus?.modelList);
    setIsLoading(false);
  };

  useEffect(() => {
    onGetUsers();
  }, [paginationNumber, changeTab]);

  const handlePaginationChange = (e, page) => {
    setPaginationNumber(page);
  };

  const handleOpenModal = (option, item) => {
    console.log(option);
    setUsers(item);
    if (option === "Edit") {
      setOpenEditModal(true);
    }
  };

  const handleOpenModalTwo = (option, item) => {
    setUsers(item);
    if (option === "Edit") {
      setOpenEditModal(true);
    } 
  };

  const changeSearchParams = (value) => {
  };


  const handleSearch = (event) => {
    

  };

  // console.log(actionData);
  const actions = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Admin",
    },
    {
      id: 3,
      title: "Super Admin",
    },
    {
      id: 4,
      title: "Customer",
    },
  ];

  const changeActions = (item) => {
    setActiveTab(item);
    switch (item) {
      case "All":
        setChangeTab("");
        setPaginationNumber(1);
        break;
      case "Admin":
        setChangeTab("Admin");
        setPaginationNumber(1);
        break;
      case "Super Admin":
        setChangeTab("Super Admin");
        setPaginationNumber(1);
        break;
      case "Customer":
          setChangeTab("Customer");
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
        FirstName: <p className="text-NEUTRAL-_900 text-sm">{item?.FirstName}</p>,
        LastName: <p className="text-NEUTRAL-_900 text-sm">{item?.LastName}</p>,
        Username: <p className="text-sm text-TITLE ">{item?.Username}</p>,
        Email: <p className="text-sm text-TITLE ">{item?.Email}</p>,
        PhoneNumber: <p className="text-sm text-TITLE ">{item?.PhoneNumber}</p>,
        UserType: <p className="text-sm text-TITLE ">{item?.UserType}</p>,
        actions: (
          <div className="">
            {item?.status === "active" ? (
              <LongMenu
                action={(e) => handleOpenModal(e, item)}
                options={optionsTwo}
              />
            ) : (
              <LongMenu
                action={(e) => handleOpenModalTwo(e, item)}
                options={options}
              />
            )}
          </div>
        ),
      };
    });
    return [...result];
  }, [venueData]);

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "FirstName",
      },
      {
        Header: "Last Name",
        accessor: "LastName",
      },
      {
        Header: "Username",
        accessor: "Username",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Phone Number",
        accessor: "PhoneNumber",
      },
      {
        Header: "User Type",
        accessor: "UserType",
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

export { Users };
