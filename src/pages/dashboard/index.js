/**
 * Create Custom Dashboard Component
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function AppDashboard() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox>
        <SuiTypography variant="h2">
          Welcome back, <strong>John Doe</strong>
        </SuiTypography>
        <SuiTypography variant="subtitle2">
          Johndoe@email.com
        </SuiTypography>
      </SuiBox>
    </DashboardLayout>
  );
}
