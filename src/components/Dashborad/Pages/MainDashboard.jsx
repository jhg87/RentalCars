import React from "react";
import { Outlet } from "react-router-dom";
import SheardLayout from "../DashboardComponents/SharedLyout";

const MainDashboard = () => {
  return (
    <>
      <SheardLayout>
        <Outlet />
      </SheardLayout>
    </>
  );
};

export default MainDashboard;
