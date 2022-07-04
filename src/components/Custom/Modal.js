/*eslint-disable */

import React from 'react';

// Sui components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// @mui material components
import {
  Divider,
  Modal
} from "@mui/material";

const CustomModal = ({ title, open, setModalConfig, children }) => {
  return (
    <Modal
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
    </Modal>
  );
};

export default CustomModal;