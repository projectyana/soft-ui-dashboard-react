import React from 'react';

import SuiBox from "components/SuiBox";

import { CircularProgress } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export const PageLoading = () => {
  return (
    <DashboardLayout>
      <SuiBox pt={6} display="flex" justifyContent="center" alignItems="center">
        <SuiBox mr={10}>
          <CircularProgress color="info" />
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
};

export const LoadingState = () => {
  return (
    <SuiBox display="flex" justifyContent="center" alignItems="center">
      <SuiBox>
        <CircularProgress color="info" />
      </SuiBox>
    </SuiBox>
  );
};

