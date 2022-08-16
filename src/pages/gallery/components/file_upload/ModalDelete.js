import React from 'react';

import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

import FileUploadApi from "apis/FileUpload";

import CustomModal from "components/Custom/Modal";

const ModalDelete = ({ fetchData, modalConfig, setModalConfig }) => {
  const { doc_category_id: id = "", name = "", path } = modalConfig?.data ?? {};

  const handleDeleteFromServer = () => {
    FileUploadApi.delete(id, { file: path })
      .then(() => {
        setModalConfig({ show: false, data: null });
        fetchData();
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"));
  };

  return (
    <CustomModal
      title="Delete File "
      maxWidth="sm"
      open={modalConfig.show}
      setModalConfig={setModalConfig}
    >
      <SuiTypography mt={2} variant="h6">
        File name: {name}
      </SuiTypography>
      <SuiTypography mt={2} color="error" variant="body2">
        This action cannot be undone.
      </SuiTypography>

      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
        <SuiButton
          variant="text"
          size="small"
          mt={2}
          sx={{ mr: 2 }}
          color="dark"
          onClick={() => setModalConfig({ show: false, data: null })}>
          Cancel
        </SuiButton>
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