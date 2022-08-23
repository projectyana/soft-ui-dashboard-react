/* eslint-disable */
/**
 * Carousel Page
 */

import React, { useEffect, useState } from "react";
import {
  Switch,
  Tooltip,
  CardActions,
  Grid,
  Icon
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import ImageCard from "components/Custom/Card/ImageCard";
import CreateButton from "components/Custom/Button/CreateButton";
import EditButton from "components/Custom/Button/EditButton";
import DeleteButton from "components/Custom/Button/DeleteButton";
import { PageLoading } from "components/Custom/Loading";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CarouselApi from "apis/Carousel";
import getRolePermissions from "utils/getRolePermissions";

import ModalCreate from "./components/ModalCreate";
import ModalEdit from "./components/ModalEdit";
import ModalConfigure from "./components/ModalConfigure";
import ModalDelete from "./components/ModalDelete";

import handleOrder from "./helpers/handleOrder";

export default function CarouselPage() {
  const { isAllowWrite } = getRolePermissions();
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

      <Grid container spacing={2} mt={2}>
        {data?.length > 0 && data.map((row, index) => (
          <Grid key={row.title} item sm={12} md={4}>
            <ImageCard
              style={{ marginRight: 2 }}
              alt={row.title}
              image={row.link}
              title={row.title}
              description={row.description}
            >
              <CardActions sx={{ paddingX: 0 }}>
                {/* allow user to arrange order if user has ability to write */}
                {isAllowWrite && (
                  <SuiBox display="flex" justifyContent="start" alignItems="center">
                    <Tooltip title="Change order forward">
                      <SuiButton
                        visibility="hidden"
                        iconOnly
                        circular
                        variant="contained"
                        disabled={index === 0}
                        color="info"
                        size="small"
                        sx={{ paddingLeft: 0, marginRight: 1 }}
                        onClick={() => handleOrder({
                          data,
                          setData,
                          index,
                          id: row.id,
                          direction: "up",
                        })}
                      >
                        <Icon>keyboard_arrow_left</Icon>
                      </SuiButton>
                    </Tooltip>

                    <Tooltip title="Change order backward">
                      <SuiButton
                        iconOnly
                        circular
                        variant="contained"
                        disabled={index === data.length - 1}
                        color="warning"
                        size="small"
                        onClick={() => handleOrder({
                          data,
                          setData,
                          index,
                          id: row.id,
                          direction: "down",
                        })}
                      >
                        <Icon>keyboard_arrow_right</Icon>
                      </SuiButton>
                    </Tooltip>

                  </SuiBox>

                )}
                <SuiBox >
                  <Tooltip title={row?.active ? 'Carousel is enabled' : 'Carousel is disabled'}>
                    <Switch
                      disabled={!isAllowWrite}
                      checked={row?.active === 1 ? true : false}
                      onChange={() => handleToggleActive(row, index)}
                    />
                  </Tooltip>
                </SuiBox>
                <EditButton onClick={() => setModalConfig({ show: true, type: "edit", data: row })} />
                <DeleteButton onClick={() => setModalConfig({ show: true, type: "delete", data: row })} />
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
