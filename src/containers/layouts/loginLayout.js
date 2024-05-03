import React from "react";
import loginBg from "../../assets/images/loginBg.svg";

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <div className="relative w-full ">
        <img className="hidden md:flex w-full" src={loginBg} alt="lik" />
      </div>
      <div className="absolute top-0 h-full w-full flex justify-center items-center">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default LoginLayout;
