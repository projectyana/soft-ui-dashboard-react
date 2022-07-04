import React from 'react';

import SuiBox from "components/SuiBox";

import { CircularProgress } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const PageLoading = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={6} display="flex" justifyContent="center" alignItems="center">
        <SuiBox mr={10}>
          <CircularProgress color="info" />
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
};

export default PageLoading;