/**
 * Create Custom Dashboard Component
 */

import React from "react";
import { useSelector } from "react-redux";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function AppDashboard() {
  const { name, email } = useSelector(state => state.auth);

  return (
    <DashboardLayout>
      <SuiBox>
        <SuiTypography variant="h2">
          Welcome back, <strong>{name}</strong>
        </SuiTypography>
        <SuiTypography variant="subtitle2">
          Hola {email} 👋🏻
        </SuiTypography>
      </SuiBox>
    </DashboardLayout>
  );
}
