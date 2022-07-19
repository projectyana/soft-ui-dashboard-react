import React from 'react';

import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

import RoleApi from "apis/Role";

import CustomModal from "components/Custom/Modal";

const ModalDelete = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id = "", name = "" } = modalConfig?.data ?? {};

  const handleDeleteFromServer = () => {
    RoleApi.delete(id)
      .then(() => {
        setModalConfig({ show: false, data: null });
        fetchData();
      })
      .catch(() => window.alert('Error connect to server'));
  };

  return (
    <CustomModal
      title="Delete Role"
      maxWidth="sm"
      open={modalConfig.show && modalConfig.type === "delete"}
      setModalConfig={setModalConfig}
    >
      <SuiTypography mt={2} variant="h6">
        Role Name: {name}
      </SuiTypography>
      <SuiTypography mt={2} color="error" variant="body2">
        This action cannot be undone.
      </SuiTypography>

      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
        {/* <SuiButton
          mt={2}
          sx={{ mr: 2 }}
          size="small"
          color="info" >
          Cancel
        </SuiButton> */}
        <SuiButton
          ml={1}
          size="small"
          color="error"
          onClick={handleDeleteFromServer}>
          Delete
        </SuiButton>
      </SuiBox>
    </CustomModal>
  );
};

export default ModalDelete;