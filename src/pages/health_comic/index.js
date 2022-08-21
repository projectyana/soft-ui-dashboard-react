/**
 * Carousel Page
 */

import React, { useEffect, useState } from "react";
import {
  CardActions,
  Grid
} from "@mui/material";
import SuiBox from "components/SuiBox";
import CreateButton from "components/Custom/Button/CreateButton";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import ComicCard from "components/Custom/Card/ComicCard";
import { PageLoading } from "components/Custom/Loading";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import HealthComicApi from "apis/HealthComic";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";

export default function HealthComicPage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create | edit | delete | configure
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    HealthComicApi.get()
      .then((res) => {
        const mapData = res?.data?.data?.map((item) => ({
          ...item,
          link: item.thumbnail ? `https://api.rokom.xyz/${item.thumbnail}` : null
        }));
        setData(mapData ?? []);
      })
      .catch((err) => window.alert(err.message))
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
        <CreateButton onClick={() => setModalConfig({ show: true, type: 'create' })} />
      </SuiBox>

      <Grid container spacing={2}>
        {data?.length > 0 && data.map((row, index) => (
          <Grid key={row.title} item xs={6} md={4}>
            <ComicCard
              style={{ marginRight: 2 }}
              alt={row.title}
              image={row.link}
              title={row.title}
              category={row.category}
            >
              <CardActions>
                <SuiBox sx={{ width: '100%' }} display="flex" justifyContent="end" alignItems="center">
                  <EditButton onClick={() => setModalConfig({ show: true, type: "edit", data: row })} />
                  <DeleteButton onClick={() => setModalConfig({ show: true, type: "delete", data: row })} />
                </SuiBox>
              </CardActions>
            </ComicCard>
          </Grid>
        ))
        }
      </Grid>

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout >
  );
}
