/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Grid,
  CardActions,
  Icon,
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import BlogCard from "components/Custom/Card/BlogCard";
import Pagination from "components/Custom/Pagination";
import { PageLoading } from "components/Custom/Loading";

import useDebounce from "hooks/useDebounce";

import BlogApi from "apis/Blog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ModalDelete from "./components/ModalDelete";

const BlogMenu = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [data, setData] = useState([]);
  const [modalConfig, setModalConfig] = useState({
    type: "delete",
    show: false,
    data: null
  });
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 5, count: 0 });
  const debounceSearch = useDebounce(search, 500);

  const fetchData = () => {
    BlogApi.get({
      page: parseInt(pagination.page) + 1,
      per_page: pagination.rowsPerPage,
      search: debounceSearch
    })
      .then((res) => {
        const mapData = res.data.data.map((item) => ({ ...item, link: item.thumbnail ? `https://api.rokom.xyz/${item.thumbnail}` : null }));
        setData(mapData ?? []);
        setPagination(prev => ({ ...prev, count: res.data.pagination.total }));
      })
      .catch((err) => window.alert("Error connect to server!"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  const getBlogRawContent = (content) => {
    const parseContent = JSON.parse(content);
    let blogContentText = "";

    if (parseContent?.blocks?.length > 0) {
      parseContent?.blocks?.forEach((item, index) => {
        if (item.type === "header" || item.type === "paragraph") {
          blogContentText += `${item.data.text ?? ""}. `;
        }
      });
    }

    return `${blogContentText.slice(0, 125)}...`;
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.rowsPerPage, debounceSearch]);

  if (fetchStatus.loading) {
    return <PageLoading />;
  }

  return (
    <DashboardLayout>
      <SuiBox pb={2} display="flex" justifyContent="space-between" alignItems="center">
        <SuiInput placeholder="Search..." icon={{ component: "search", direction: "left" }} onChange={(e) => setSearch(e.target.value ?? "")} />
        <SuiButton size="medium" color="info" onClick={() => navigate("editor/create")}>
          Create
        </SuiButton>
      </SuiBox>

      {/* Blog Cards */}
      <Grid container spacing={2}>
        {data?.length > 0 && data.map((row, index) => (
          <Grid key={row.title} item xs={6} md={4}>
            <BlogCard
              alt={row.title}
              image={row.link}
              title={row.title}
              slug={row.slug}
              tags={row.tags}
              author={row?.author?.name ?? ""}
              content={getBlogRawContent(row.content)}
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

      {/* Pagination  */}
      <Pagination
        count={pagination.count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={(e, newPage) => setPagination(prev => ({ ...prev, page: newPage }))}
        onRowsPerPageChange={(e) => setPagination(prev => ({ ...prev, page: 0, rowsPerPage: parseInt(e.target.value, 10) }))} />

      {/* Modal Delete */}
      {modalConfig.show && modalConfig.type === "delete" && <ModalDelete fetchData={fetchData} modalConfig={modalConfig} setModalConfig={setModalConfig} />}
    </DashboardLayout>);
};

export default BlogMenu;