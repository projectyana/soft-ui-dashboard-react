
import React from 'react';
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import getRolePermissions from "utils/getRolePermissions";

const CreateButton = ({ onClick, text }) => {
  const { isAllowWrite } = getRolePermissions();

  return (
    <SuiBox>
      {isAllowWrite && (
        <SuiButton
          size="medium"
          color="info"
          onClick={onClick}
        >
          {text ?? "CREATE"}
        </SuiButton>
      )}
    </SuiBox>
  );
};

export default CreateButton;