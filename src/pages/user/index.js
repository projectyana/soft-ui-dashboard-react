/* eslint-disable */

/**
 * Role Page
 */

import React, { useState } from "react";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiPagination from "components/SuiPagination";
import SuiTypography from "components/SuiTypography";

// @mui material components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon,
  CircularProgress
} from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PageLoading from "components/Custom/PageLoading";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";

export default function UserPage() {
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'create',    // create | edit 
    show: false,
    data: null
  });

  const fakeData = [
    {
      "id": 1,
      "role_id": 1,
      "username": "user",
      "email": "user@email.com",
      "name": "Test User",
    },
    {
      "id": 2,
      "role_id": 1,
      "username": "admin",
      "email": "admin@email.com",
      "name": "Administrator",
    }
  ];

  if (loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        {/* <SuiInput placeholder="Type here..." icon={{ component: "search", direction: "left" }} /> */}
        <SuiButton size="medium" color="info" onClick={() => setModalConfig({ show: true, type: 'create' })}>
          Create
        </SuiButton>
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Name</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Role</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Username</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Email</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {fakeData.map((row) => (
              <TableRow key={row.id} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.name}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.role_id}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.username}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.email}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="dark"
                        onClick={() => setModalConfig({ show: true, type: "edit" })}
                      >
                        <Icon>edit</Icon>&nbsp;edit
                      </SuiButton>
                    </SuiBox>
                    <SuiBox mr={1}>
                      <SuiButton size="small" variant="text" color="error">
                        <Icon>delete</Icon>&nbsp;delete
                      </SuiButton>
                    </SuiBox>
                  </SuiBox>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SuiBox mt={4} pb={2} display="flex" justifyContent="center" alignItems="center">
        {/* <SuiPagination>
          <SuiPagination item>
            <Icon>keyboard_arrow_left</Icon>
          </SuiPagination>
          <SuiPagination item active>
            1
          </SuiPagination>
          <SuiPagination item>2</SuiPagination>
          <SuiPagination item>3</SuiPagination>
          <SuiPagination item>
            <Icon>keyboard_arrow_right</Icon>
          </SuiPagination>
        </SuiPagination> */}
      </SuiBox>

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>
  );
}
