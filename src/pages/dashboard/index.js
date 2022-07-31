/**
 * Create Custom Dashboard Component
 */

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Card,
  CardActions,
  Icon,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import {
  Web,
  Article,
  Landscape,
  SupervisorAccount
} from '@mui/icons-material';

import DashboardApi from "apis/Dashboard";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import ImageCard from "components/Custom/Card/ImageCard";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

export default function AppDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({});
  const { name, email } = useSelector(state => state.auth);

  const fetchData = () => {
    DashboardApi.get()
      .then(({ data }) => {
        const mapBlog = data?.data?.recent_blogs?.map(blog => ({ ...blog, link: blog?.thumbnail ? `https://api.rokom.xyz/${blog.thumbnail}` : null}));
        setDashboard({ ...data?.data, recent_blogs: mapBlog ?? [] } ?? {});
      });
  };

  useEffect(() => {
    fetchData();

    return () => setDashboard({});
  }, []);


  return (
    <DashboardLayout>
      <SuiBox>
        <SuiTypography variant="h2">
          Welcome back, <strong>{name}</strong>
        </SuiTypography>
        <SuiTypography variant="subtitle2">
          Hola {email} 👋🏻
        </SuiTypography>

        <Grid container mt={2} spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Admin" }}
              count={dashboard?.admin_count}
              icon={{ color: "info", component: <SupervisorAccount /> }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Page" }}
              count={dashboard?.page_count}
              icon={{ color: "info", component: <Web /> }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Blog" }}
              count={dashboard?.blog_count}
              icon={{ color: "info", component: <Article /> }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Carousel" }}
              count={dashboard?.carousel_count}
              icon={{ color: "info", component: <Landscape /> }}
            />
          </Grid>
        </Grid>

        <SuiTypography mt={4} mb={1} variant="h4">Recent Blogs</SuiTypography>
        <Grid container spacing={2} >
          {dashboard?.recent_blogs?.length > 0 && dashboard?.recent_blogs?.map((row, index) => (
            <Grid
              style={{ pointer: 'cursor' }}
              key={row.title} item xs={6} md={4}>
              <ImageCard
                style={{ marginRight: 2 }}
                alt={row.title}
                image={row.link ?? null}
                title={row.title}
                description={row.description}
              >
                <CardActions>
                  <SuiBox sx={{ width: '100%' }} display="flex" justifyContent="end" alignItems="end" >
                    <SuiButton
                      size="small"
                      variant="text"
                      color="dark"
                      onClick={() => navigate("/blog/editor/edit", { state: { ...row } })}
                    >
                      <Icon>edit</Icon> &nbsp;edit
                    </SuiButton>
                  </SuiBox>
                </CardActions>
              </ImageCard>
            </Grid>
          ))
          }
        </Grid>
      </SuiBox>
    </DashboardLayout >
  );
}
