/**
 * Modal to delete a menu parent
*/

import React from 'react';
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

import FooterApi from "apis/Footer";

import CustomModal from "components/Custom/Modal";

const ModalDelete = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id = "", name = "" } = modalConfig?.data ?? {};

  const handleDeleteFromServer = () => {
    FooterApi.delete(id)
      .then(() => {
        setModalConfig({ show: false, data: null });
        fetchData();
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  return (
    <CustomModal
      title="Delete Footer Menu"
      maxWidth="sm"
      open={modalConfig.show && modalConfig.type === "delete"}
      setModalConfig={setModalConfig}
    >
      <SuiTypography mt={2} variant="h6">
        Footer Menu Name: {name}
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