/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Icon
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { PageLoading } from "components/Custom/Loading";

import BlogApi from "apis/Blog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ModalDelete from "./components/ModalDelete";

const BlogMenu = () => {
  const navigate = useNavigate();
  const [fetchStatus, setFetchStatus] = useState({ loading: false });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "delete",
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    BlogApi.get()
      .then((res) => setData(res.data.data ?? []))
      .catch((err) => window.alert("Error connect to server!"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        {/* <SuiInput placeholder="Type here..." icon={{ component: "search", direction: "left" }} /> */}
        <SuiButton size="medium" color="info" onClick={() => navigate("editor/create")}>
          Create
        </SuiButton>
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Title</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Slug</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Tags</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.length > 0 ? data.map((row) => (
              <TableRow key={row.title} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row?.title}</SuiTypography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.slug}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{row.tags}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="dark"
                        onClick={() => navigate("editor/edit", { state: { ...row } })}
                      >
                        <Icon>edit</Icon>&nbsp;edit
                      </SuiButton>
                    </SuiBox>
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="error"
                        onClick={() => setModalConfig({ show: true, type: "delete", data: row })}
                      >
                        <Icon>delete</Icon>&nbsp;delete
                      </SuiButton>
                    </SuiBox>
                  </SuiBox>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <SuiTypography variant="h6">Tidak ada data</SuiTypography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>);
};

export default BlogMenu;