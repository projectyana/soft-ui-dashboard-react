/* eslint-disable */
import React, { useEffect } from 'react';

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import VisualEditor from "components/Custom/VisualEditor";

const PageMenu = () => {
  const [controller, dispatch] = useSoftUIController();
  const isFullscreen = window.innerHeight == screen.height;

  useEffect(() => {
    setMiniSidenav(dispatch, true);

    return () => {
      setMiniSidenav(dispatch, false);
    };
  }, [isFullscreen]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VisualEditor />
    </DashboardLayout>
  );
};

export default PageMenu;