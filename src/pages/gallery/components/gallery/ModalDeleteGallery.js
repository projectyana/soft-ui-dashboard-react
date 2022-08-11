import React from 'react';

import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

import GalleryApi from "apis/Gallery";

import CustomModal from "components/Custom/Modal";

const ModalDeleteGallery = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id = "", link } = modalConfig?.data ?? {};

  const handleDeleteFromServer = () => {
    GalleryApi.removeImageGallery(id, { image: link.path })
      .then(() => {
        setModalConfig({ show: false, data: null });
        fetchData();
      })
      .catch(() => window.alert('Error connect to server'));
  };

  return (
    <CustomModal
      title="Delete Image Gallery"
      maxWidth="sm"
      open={modalConfig.show && modalConfig.type === "delete"}
      setModalConfig={setModalConfig}
    >
      <SuiBox mt={2}>
        <img
          alt="gallery"
          style={{
            height: 200,
            width: '100%',
            objectFit: 'cover',
          }}
          src={link.full_path}
        />
      </SuiBox>
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

export default ModalDeleteGallery;