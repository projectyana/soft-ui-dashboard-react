/*eslint-disable */

import React from 'react';

// Sui components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// @mui material components
import {
  Divider,
  Modal,
  Dialog
} from "@mui/material";

const CustomModal = ({ fullwidth = true, maxWidth = "md", title, open, setModalConfig, children }) => {
  return (
    <Dialog
      fullWidth={fullwidth}
      maxWidth={maxWidth}
      open={open}
      onClose={() => setModalConfig(prev => ({ ...prev, show: false }))}
    >
      <SuiBox bgColor="white" borderRadius="lg" m={4} p={2}>
        <SuiTypography mb={1} variant="h4" fontWeight="medium" textTransform="capitalize">
          {title}
        </SuiTypography>
        <Divider />
        <SuiBox mt={2}>
          {/* Children */}
          {children}
        </SuiBox>
      </SuiBox>
    </Dialog>
  );
};

export default CustomModal;