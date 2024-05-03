import React from "react";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../../../components/Table";
import Breadcrumb from "../../../../components/Breadcrumb/breadcrumb";
import AvailabiltyService from "../../../../services/availabilty.service";


const actionItems = ["Email", "Firstname", "Lastname"];

const VenueDetails = (props) => {
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const [availabilityData, setavailabilityData] = useState([]);
  let id = props.match.params.id;

  const { getAvailbilityByVenue } = AvailabiltyService();

  const onGetVenuesAvailabilty  = async () => {
    setIsLoading(true);
    const venueAvailabilty = await getAvailbilityByVenue(id);
    if (venueAvailabilty?.modelList) setavailabilityData(venueAvailabilty?.modelList);
    setIsLoading(false);
  };

  useEffect(() => {
    onGetVenuesAvailabilty();
  }, []);

  const handlePaginationChange = (e, page) => {
    setPaginationNumber(page);
  };

  const changeSearchParams = (value) => {
  };

  const handleSearch = (event) => {
  };

  const getData = useCallback(() => {
    const result = availabilityData.map((item, i) => {
      return {
        VenueName: (
          <div className="flex items-center">
            <div className="flex flex-col">
              <Link to={`/My-Teams/${item?.id}`}>
                <p className="text-sm cursor-pointer text-NEUTRAL-_900">
                  {`${item?.VenueName}`}
                </p>
              </Link>
            </div>
          </div>
        ),
        date: <p className="text-NEUTRAL-_900 text-sm">
        {new Date(item?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>,
      
        start_time: <p className="text-NEUTRAL-_900 text-sm">{item?.start_time}</p>,
        end_time: <p className="text-sm text-TITLE ">{item?.end_time}</p>,
        view: (
          <Link to={`/Venues/${item?.venue_id}`}>
            <p className="text-sm cursor-pointer text-BLUE-_300">Make reservation</p>
          </Link>
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
          </div>
        ),
      };
    });
    return [...result];
  }, [availabilityData]);

  const columns = useMemo(
    () => [
      { Header: "Available Date", accessor: "date" },
      { Header: "Start time", accessor: "start_time" },
      { Header: "End time", accessor: "end_time" },
      { Header: "Status", accessor: "status" },
      { Header: "", accessor: "view" },
      { Header: "", accessor: "actions" }
    ],
    []
  );

  const data = useMemo(() => getData(), [getData]);

  return (
    <div className="w-full p-5">
      <Breadcrumb
        className="mb-3"
        links={[
          { title: "Dashboard", link: "/" },
          { title: "Venue", link: "/Venues" },
          { title: "Venue Availability", link: "#" },
        ]}
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

export { VenueDetails };