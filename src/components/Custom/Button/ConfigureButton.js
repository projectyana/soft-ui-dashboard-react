import React from 'react';
import { Icon } from "@mui/material";
import SuiBox from 'components/SuiBox';
import SuiButton from "components/SuiButton";
import getRolePermissions from "utils/getRolePermissions";

const ConfigureButton = ({ onClick }) => {
  const { isAllowWrite } = getRolePermissions();

  return (
    <SuiBox mr={1}>
      {isAllowWrite && (
        <SuiButton
          size="small"
          variant="text"
          color="info"
          onClick={onClick}
        >
          <Icon>settings</Icon>&nbsp;configure
        </SuiButton>
      )}
    </SuiBox>
  );
};

export default ConfigureButton;