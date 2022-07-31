/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Grid,
  CardActions,
  Icon
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import { PageLoading } from "components/Custom/Loading";
import BlogCard from "components/Custom/Card/BlogCard";

import BlogApi from "apis/Blog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ModalDelete from "./components/ModalDelete";

const BlogMenu = () => {
  const navigate = useNavigate();
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "delete",
    show: false,
    data: null
  });

  const fetchData = () => {
    setFetchStatus({ loading: true });

    BlogApi.get()
      .then((res) => {
        const mapData = res.data.data.map((item) => ({ ...item, link: item.thumbnail ? `https://api.rokom.xyz/${item.thumbnail}` : null })).reverse();
        setData(mapData ?? []);
      })
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
      <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
        {/* <SuiInput placeholder="Type here..." icon={{ component: "search", direction: "left" }} /> */}
        <SuiButton size="medium" color="info" onClick={() => navigate("editor/create")}>
          Create
        </SuiButton>
      </SuiBox>

      <Grid container spacing={2}>
        {data?.length > 0 && data.map((row, index) => (
          <Grid key={row.title} item xs={6} md={4}>
            <BlogCard
              style={{ marginRight: 2 }}
              alt={row.title}
              image={row.link}
              title={row.title}
              slug={row.slug}
              tags={row.tags}
              author={row?.author?.name ?? ""}
            >
              <CardActions>
                <SuiBox sx={{ width: '100%' }} display="flex" justifyContent="end" alignItems="center">
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
              </CardActions>
            </BlogCard>
          </Grid>
        ))
        }
      </Grid>

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>);
};

export default BlogMenu;