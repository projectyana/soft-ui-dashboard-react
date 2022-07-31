/* eslint-disable*/

/**
 * Current Livestream session
 */

import React, { useEffect, useState } from "react";
import {
  Divider,
  Card,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { PageLoading } from "components/Custom/Loading";

import LivestreamApi from "apis/Livestream";

import ModalCreate from "./components/ModalCreate";
import LivesteamCard from "./components/LivesteamCard";

export default function LivestreamPage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState({});
  const [history, setHistory] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create 
    show: false,
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    LivestreamApi.get()
      .then((res) => setData(res.data.data ?? {}))
      .catch(() => setData({}))
      .finally(() => setFetchStatus({ loading: false }));
  };

  const fetchHistory = () => {
    LivestreamApi.history()
      .then((res) => setHistory(res.data.data ?? []))
      .catch(() => setHistory([]));
  };

  const convertDateTime = date => new Intl.DateTimeFormat('id-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(date));

  useEffect(() => {
    fetchData();
    fetchHistory();

    return () => { setData({}); };
  }, []);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        {/* Create livestream button */}
        {!data?.url && (
          <SuiButton size="medium" color="info" onClick={() => setModalConfig({ show: true, type: 'create' })}>
            Start
          </SuiButton>
        )}
      </SuiBox>

      {/* No Streaming Found */}
      {!data?.url && (

        <Card sx={{ width: '100%', height: 100 }}>
          <SuiBox display="flex" justifyContent="center" alignItems="center">
            <SuiTypography mt={4} >
              No streaming found
            </SuiTypography>
          </SuiBox>
        </Card>
      )}

      {/* Livestream card */}
      {data?.url && <LivesteamCard data={data} setData={setData} fetchData={fetchData} fetchHistory={fetchHistory} />}

      <SuiBox mt={4}>
        <SuiTypography mb={1} variant="h5">Stream histories</SuiTypography>
        <TableContainer component={Paper} mt={2}>
          {/* <SuiTypography mx={2} mt={2} variant="h5">Streams histories</SuiTypography> */}
          <Table aria-label="simple table">
            <TableRow>
              <TableCell>
                <SuiTypography variant="h6">Name</SuiTypography>
              </TableCell>
              <TableCell>
                <SuiTypography variant="h6">URL</SuiTypography>
              </TableCell>
              <TableCell>
                <SuiTypography variant="h6">Started</SuiTypography>
              </TableCell>
              <TableCell>
                <SuiTypography variant="h6">Ended</SuiTypography>
              </TableCell>
            </TableRow>
            <TableBody>
              {history?.length > 0 ? history.map((row, index) => (
                <TableRow key={`${row.url}${index}`} >
                  <TableCell>
                    <SuiTypography variant="caption">{row.name}</SuiTypography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <SuiTypography variant="caption">{row.url}</SuiTypography>
                  </TableCell>
                  <TableCell>
                    <SuiTypography variant="caption">{convertDateTime(row.created_at)}</SuiTypography>
                  </TableCell>
                  <TableCell>
                    <SuiTypography variant="caption">{convertDateTime(row.ended_at)}</SuiTypography>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <SuiTypography variant="h6">No streams history</SuiTypography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </SuiBox>


      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout >
  );
}
