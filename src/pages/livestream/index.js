
/**
 * Current Livestream session
 */

import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";

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

  useEffect(() => {
    fetchData();

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
      {data?.url && <LivesteamCard data={data} setData={setData} fetchData={fetchData} />}

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout >
  );
}
