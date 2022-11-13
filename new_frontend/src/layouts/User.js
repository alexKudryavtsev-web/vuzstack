import React from "react";
import {  Outlet } from "react-router-dom";

import UserNavbar from "components/Navbars/UserNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterUser from "components/Footers/FooterUser.js";

export default function User() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <UserNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet/>
          <FooterUser />
        </div>
      </div>
    </>
  );
}
