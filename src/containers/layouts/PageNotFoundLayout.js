import React from "react";

export default function PageNotFoundLayout({ children }) {
  return (
    <div className="flex justify-center bg-gray-50 flex-col items-center h-screen w-full">
      {children}
    </div>
  );
}
