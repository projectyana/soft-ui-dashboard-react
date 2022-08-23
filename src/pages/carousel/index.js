/* eslint-disable */
/**
 * Carousel Page
 */

import React, { useEffect, useState } from "react";

import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

// @mui material components
import {
  Icon,
  Switch,
  Tooltip,
  CardActions,
  Grid
} from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import { PageLoading } from "components/Custom/Loading";
import ImageCard from "components/Custom/Card/ImageCard";
import CarouselApi from "apis/Carousel";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalConfigure from "./components/ModalConfigure";
import ModalDelete from "./components/ModalDelete";

export default function CarouselPage() {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "create",    // create | edit | delete | configure
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    CarouselApi.get()
      .then((res) => {
        const mapData = res?.data?.data?.map((item) => ({
          ...item,
          link: `https://api.rokom.xyz/${item.url}`
        }));
        setData(mapData ?? []);
      })
      .catch((err) => window.alert(err.message))
      .finally(() => setFetchStatus({ loading: false }));
  };

  const handleToggleActive = (row, index) => {
    CarouselApi.update(row.id, { ...row, active: !row.active })
      .then(() => {
        const newData = [...data];
        const value = newData[index];
        value.active = !row.active;

        setData(newData);
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  useEffect(() => {
    fetchData();
    console.log(data);

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

      <Grid container spacing={2} mt={2}>
        {data?.length > 0 && data.map((row, index) => (
          <Grid key={row.title} item xs={6} md={3}>
            <ImageCard
              style={{ marginRight: 2 }}
              alt={row.title}
              image={row.link}
              title={row.title}
              description={row.description}
            >
              <CardActions>
                <SuiBox >
                  <Tooltip title={row?.active ? 'Slider is enabled' : 'Slider is disabled'}>
                    <Switch
                      checked={row?.active ?? false}
                      onChange={() => handleToggleActive(row, index)}
                    />
                  </Tooltip>
                </SuiBox>
                <SuiBox >
                  <SuiButton
                    size="small"
                    variant="text"
                    color="dark"
                    onClick={() => setModalConfig({ show: true, type: "edit", data: row })}
                  >
                    <Icon>edit</Icon>&nbsp;edit
                  </SuiButton>
                </SuiBox>
                <SuiBox >
                  <SuiButton
                    size="small"
                    variant="text"
                    color="error"
                    onClick={() => setModalConfig({ show: true, type: "delete", data: row })}
                  >
                    <Icon>delete</Icon>&nbsp;delete
                  </SuiButton>
                </SuiBox>
              </CardActions>
            </ImageCard>
          </Grid>
        ))
        }
      </Grid>

      {/* Modal  Create */}
      {modalConfig.show && modalConfig.type === "create" && <ModalCreate fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Edit */}
      {modalConfig.show && modalConfig.type === "edit" && <ModalEdit fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Configure */}
      {modalConfig.show && modalConfig.type === "configure" && <ModalConfigure fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout >
  );
}
