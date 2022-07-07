/**
 * Create Custom Dashboard Component
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function AppDashboard() {
  const { name, email } = useSelector(state => state.auth);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiTypography variant="h2">
          Welcome back, <strong>{name}</strong>
        </SuiTypography>
        <SuiTypography variant="subtitle2">
          {email}
        </SuiTypography>
      </SuiBox>
    </DashboardLayout>
  );
}
