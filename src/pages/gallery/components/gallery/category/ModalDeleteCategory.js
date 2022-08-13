import React from 'react';
import CustomModal from 'components/Custom/Modal';
import GalleryApi from "apis/Gallery";

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';

function ModalDeleteCategory({ fetchData, modalConfigCategory, setModalConfig, setModalConfigEdit }) {
  const { id = "", title = "" } = modalConfigCategory?.data ?? {};

  const handleDeleteFromServer = () => {
    GalleryApi.delete(id)
      .then(() => {
        setModalConfig({ show: false, data: null });
        setModalConfigEdit({ show: false, data: null });
        fetchData();
      })
      .catch(() => window.alert('Error connect to server'));

  };
  return (
    <CustomModal
      title="Delete Category"
      maxWidth="sm"
      open={modalConfigCategory.show}
      setModalConfig={setModalConfig}
    >
      <SuiTypography mt={2} variant="h6">
        Category title: {title}
      </SuiTypography>
      <SuiTypography mt={2} color="error" variant="body2">
        This action cannot be undone.
      </SuiTypography>
      <SuiBox display="flex" justifyContent="flex-end" mt={2}>
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
}

export default ModalDeleteCategory;