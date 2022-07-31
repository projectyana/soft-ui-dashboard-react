/**
 * Create Custom Dashboard Component
 */

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Card,
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

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

export default function AppDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { name, email } = useSelector(state => state.auth);

  return (
    <DashboardLayout>
      <SuiBox>
        <SuiTypography variant="h2">
          Welcome back, <strong>{name}</strong>
        </SuiTypography>
        <SuiTypography variant="subtitle2">
          Hola {email} 👋🏻
        </SuiTypography>

        {/* <Grid container mt={2} spacing={3}>
          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Admin" }}
              count="2"
              icon={{ color: "info", component: <SupervisorAccount /> }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Page" }}
              count="2"
              icon={{ color: "info", component: <Web /> }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Blog" }}
              count="2"
              icon={{ color: "info", component: <Article /> }}
            />
          </Grid>

          <Grid item xs={12} sm={6} xl={3}>
            <MiniStatisticsCard
              title={{ text: "Carousel" }}
              count="2"
              icon={{ color: "info", component: <Landscape /> }}
            />
          </Grid>

          <Grid item xs={12} sm={12} xl={6}>
            <Card>
              <SuiTypography variant="h5" mx={2} mt={2}>
                Recent Blogs
              </SuiTypography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableRow>
                    <TableCell>
                      <SuiTypography variant="h6">Title</SuiTypography>
                    </TableCell>
                    <TableCell>
                      <SuiTypography variant="h6">Slug</SuiTypography>
                    </TableCell>
                    <TableCell>
                      <SuiTypography variant="h6">Tags</SuiTypography>
                    </TableCell>
                    <TableCell>
                      <SuiTypography variant="h6">Action</SuiTypography>
                    </TableCell>
                  </TableRow>
                  <TableBody>
                    {data?.length > 0 ? data.map((row) => (
                      <TableRow key={row.title} >
                        <TableCell component="th" scope="row">
                          <SuiTypography variant="caption">{row?.title}</SuiTypography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <SuiTypography variant="caption">{row.slug}</SuiTypography>
                        </TableCell>
                        <TableCell>
                          <SuiTypography variant="caption">{row.tags}</SuiTypography>
                        </TableCell>
                        <TableCell>
                          <SuiBox display="flex" alignItems="center">
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
                          <SuiTypography variant="h6">No data</SuiTypography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Grid> */}
      </SuiBox>
    </DashboardLayout>
  );
}
