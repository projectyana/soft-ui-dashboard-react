import React from 'react';
import { Icon } from "@mui/material";
import SuiBox from 'components/SuiBox';
import SuiButton from "components/SuiButton";
import getRolePermissions from "utils/getRolePermissions";

const DeleteButton = ({ onClick }) => {
  const { isAllowDelete } = getRolePermissions();

  return (
    <SuiBox>
      {isAllowDelete && (
        <SuiButton
          size="small"
          variant="text"
          color="error"
          onClick={onClick}
        >
          <Icon>delete</Icon>&nbsp;delete
        </SuiButton>
      )}
    </SuiBox >
  );
};

export default DeleteButton;