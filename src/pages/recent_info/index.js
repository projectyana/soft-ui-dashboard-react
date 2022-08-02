
/**
 * Recent Info Page
 */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Icon
} from "@mui/material";
import Axios from "axios";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { PageLoading } from "components/Custom/Loading";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import RecentInfoApi from "apis/RecentInfo";
import RecentInfoCategoryApi from "apis/RecentInfoCategory";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

export default function RecentInfoPage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create | edit | delete | configure
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    Axios.all([
      RecentInfoApi.get(),
      RecentInfoCategoryApi.dropdown()
    ])
      .then(Axios.spread((resInfo, resDropdown) => {
        const mapDropdown = resDropdown.data.data.map(item => ({ ...item, value: item.id, label: item.name }));

        setData(resInfo.data.data ?? []);
        setDropdown(mapDropdown);
      }))
      .catch((err) => window.alert(err.message ?? "Error connect to server"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  const convertDateTime = date => new Intl.DateTimeFormat('id-ID').format(new Date(date));

  useEffect(() => {
    fetchData();

    return () => { setData([]); };
  }, []);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        <SuiButton size="medium" color="info" onClick={() => setModalConfig({ show: true, type: 'create' })}>
          Create
        </SuiButton>
      </SuiBox>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableRow>
            <TableCell>
              <SuiTypography variant="h6">Info</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Description</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Category</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Publish Date</SuiTypography>
            </TableCell>
            <TableCell>
              <SuiTypography variant="h6">Action</SuiTypography>
            </TableCell>
          </TableRow>
          <TableBody>
            {data?.length > 0 ? data.map((row) => (
              <TableRow key={row.name} >
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.info}</SuiTypography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{row.description ?? ""}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiTypography variant="caption">{dropdown?.find(i => i.value === row.recent_info_category_id)?.label ?? ""}</SuiTypography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <SuiTypography variant="caption">{convertDateTime(row.publish_date)}</SuiTypography>
                </TableCell>
                <TableCell>
                  <SuiBox display="flex" alignItems="center">
                    <SuiBox mr={1}>
                      <SuiButton
                        size="small"
                        variant="text"
                        color="dark"
                        onClick={() => setModalConfig({ show: true, type: "edit", data: row })}
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

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} dropdown={dropdown} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} dropdown={dropdown} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>
  );
}
