
/**
 * Current Livestream session
 */

import React, { useEffect, useState } from "react";

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
      .catch((err) => window.alert(err.message ?? "Error connecting to server"))
      .finally(() => setFetchStatus({ loading: false }));
  };

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
        {/* Create livestream button */}
        {!data?.url && (
          <SuiButton size="medium" color="info" onClick={() => setModalConfig({ show: true, type: 'create' })}>
            Create
          </SuiButton>
        )}
      </SuiBox>

      {/* No Streaming Found */}
      {!data?.url && (
        <SuiBox display="flex" justifyContent="center" alignItems="start">
          <SuiTypography >
            No streaming found
          </SuiTypography>
        </SuiBox>
      )}

      {/* Livestream card */}
      {data?.url && <LivesteamCard data={data} fetchData={fetchData} />}

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout >
  );
}
