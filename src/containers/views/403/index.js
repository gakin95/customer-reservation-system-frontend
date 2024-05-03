import React from "react";
import { useHistory } from "react-router-dom";

const Forbidden = () => {
  const history = useHistory();
  return (
    <div className="bg-gradient-to-r from-themeGrey to-themeGrey">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl font-bold text-themeBlue">403</h1>
            <h1 className="text-6xl font-medium py-8">Forbidden!</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              You do not have permission to view this page
            </p>
            <button
              onClick={() => history.goBack()}
              className="px-4 lg:px-6 py-2 rounded text-sm focus:outline-none border-2 border-indigo-600 text-white opacity-100 hover:opacity-75 bg-indigo-600 shadow-lg ml-0 sm:ml-2 font-semibold hover:font-bold mt-4 sm:mt-0"
              activeClassName="bg-themePurple text-white border-themeBlue dark:border-gray-300"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Forbidden };


