import React from 'react';
import { Icon } from "@mui/material";
import SuiBox from 'components/SuiBox';
import SuiButton from "components/SuiButton";
import getRolePermissions from "utils/getRolePermissions";

const EditButton = ({ onClick }) => {
  const { isAllowWrite } = getRolePermissions();

  return (
    <SuiBox>
      {isAllowWrite && (
        <SuiButton
          size="small"
          variant="text"
          color="dark"
          onClick={onClick}
        >
          <Icon>edit</Icon>&nbsp;edit
        </SuiButton>
      )}
    </SuiBox >
  );
};

export default EditButton;