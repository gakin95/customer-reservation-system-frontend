import React, { useState, useRef } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useRowSelect,
  useExpanded,
} from "react-table";

import search from "../assets/icons/search.svg";
import filter from "../assets/icons/Filter.svg";
import PaginationControlled from "./forms/pagination";
import ButtonActions from "./buttonActions";
import Spinner from "./Spinner";
import Text from "./Typography/Typography";
import EmptyState from "./EmptyState";

const Table = ({
  columns: userColumns,
  data,
  totalNumberOfPages,
  page,
  handlePaginationChange,
  children,
  placeholder,
  isLoading,
  errorMessage,
  ifActions = true,
  setActionData,
  mainEmptyStateText,
  subEmptyStateText,
  removePaginationAndFiltering = false,
  actionItems,
  handleSearch,
  // inputValue,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useGlobalFilter,
    useExpanded,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     // Let's make a column for selection
    //     {
    //       id: "selection",
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           {showChecked && (
    //             <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //           )}
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           {showChecked && (
    //             <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //           )}
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );

  {
    /* <img
          src={filter}
          alt="filter"
          className="absolute top-1 w-4 h-4 ml-2"
          style={{ left: "49rem" }}
        /> */
  }

  // Checkbox function
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  const renderItem = () => {
    if (isLoading) {
      // return (
      //   <div className="w-full flex flex-column justify-center items-center  h-52">
      //     <Spinner />
      //   </div>
      // );
    } else if (errorMessage) {
      return (
        <div className="w-full flex flex-column justify-center items-center h-52">
          <Text variant="h1" color="font-bold not-italic">
            {errorMessage}
          </Text>
        </div>
      );
    } else {
      return (
        <>
          <tbody className="w-full" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <React.Fragment key={i}>
                  <tr
                    key={row.id}
                    className="table-style"
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell, i) => {
                      return (
                        <React.Fragment key={i}>
                          <td
                            key={row.id}
                            className="border-t border-BUTTON_FILLED p-4"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </>
      );
    }
  };
  // overflow-x-auto we might need to put this back on the table
  return (
    <div className="py-4 w-full overflow-x-auto bg-white rounded-2xl whitespace-nowrap">
      <div className="w-full px-2 pb-6">{children}</div>
      {!removePaginationAndFiltering && (
        <div className="flex items-center w-full mt-2">
          <div className="" style={{ width: "100%" }}>
            <span className="px-2 font-normal focus:outline-none relative ml-1">
              <img
                src={search}
                alt="search"
                className="absolute left-3 top-1 w-4 h-4 ml-2"
              />
              <input
                onChange={(e) => handleSearch(e)}
                placeholder={placeholder}
                className="text-TITLE text-xs outline-none bg-BUTTON_FILLED rounded-md pl-10 p-3"
                style={{ width: ifActions ? "100%" : "100%" }}
              />
            </span>
          </div>
          <div className="ml-10" style={{ width: "20%" }}>
            {ifActions && (
              <ButtonActions
                //setPaginationNumber={setPaginationNumber}
                actionItems={actionItems}
                setActionData={setActionData}
              />
            )}
          </div>
        </div>
      )}

      <table className="w-full" {...getTableProps()} border="1">
        <thead className="w-full">
          {headerGroups.map((headerGroup, id) => (
            <tr key={id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <th
                  key={id}
                  className="p-4 text-left font-bold text-sm text-TITLE uppercase"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {renderItem()}
      </table>
      {!removePaginationAndFiltering && data.length > 0 && !isLoading && (
        <div className="flex justify-end pt-3">
          <PaginationControlled
            handlePaginationChange={handlePaginationChange}
            totalNumberOfPages={totalNumberOfPages}
            page={page}
          />
        </div>
      )}
      {isLoading && (
        <div className="w-full flex flex-column justify-center items-center  h-52">
          <Spinner />
        </div>
      )}
      {data.length < 1 && !isLoading && (
        <div className="w-full">
          <EmptyState
            mainEmptyStateText={mainEmptyStateText}
            subEmptyStateText={subEmptyStateText}
          />
        </div>
      )}
    </div>
  );
};

export { Table };
