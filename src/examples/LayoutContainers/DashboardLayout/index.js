/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// react-router-dom components
import { useLocation } from "react-router-dom";

// import mui components
import { Alert } from "@mui/material";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React context
import { useSoftUIController, setLayout } from "context";
import { setAlert } from "store/alertSlice";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();
  const reduxDispatch = useDispatch();
  const { show, severity, message } = useSelector(state => state.alert);

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  useEffect(() => {
    if (show) {
      setTimeout(() => reduxDispatch(setAlert({ show: false, severity: "info", message: "" })), 5000);
    }
  }, [show]);

  return (
    <SuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <DashboardNavbar />
      <SuiBox mb={2}>
        {show && (<Alert severity={severity}>{message}</Alert>)}
      </SuiBox>
      {children}
    </SuiBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
