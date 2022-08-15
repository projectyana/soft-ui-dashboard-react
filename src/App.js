/* eslint-disable */;

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

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authLogin, authLogout } from "store/authSlice";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

// Image
import kemenkes from "assets/images/logos/kemenkes-transparent.png";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const reduxDispatch = useDispatch();

  const storageToken = localStorage.getItem("token");
  const { token } = useSelector((state) => state?.auth);

  // Check if authentication
  const checkAuth = () => {
    if (!storageToken) {
      return reduxDispatch(authLogout());
    }

    return reduxDispatch(authLogin({ token: storageToken }));
  };

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // Check token and setup routes
  useEffect(() => {
    checkAuth();
  }, [storageToken, token]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('service worker is supported');
      console.log(navigator.serviceWorker);
      navigator.serviceWorker.getRegistrations()
        .then(function (registrations) {
          console.log(registrations);
          if (registrations.length) {
            for (let registration of registrations) {
              console.log(registration);
              registration.unregister();
            }
          }
        });
    }
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes?.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {storageToken && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={kemenkes}
            brandName="Back Office"
            routes={routes.protectedPath}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}

      <Routes> {storageToken ? getRoutes(routes.protectedPath) : getRoutes(routes.publicPath)} </Routes>
    </ThemeProvider>
  );
}
