import React from 'react';

import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiBox from "components/SuiBox";

import CarouselApi from "apis/Carousel";

import CustomModal from "components/Custom/Modal";

const ModalDelete = ({ fetchData, modalConfig, setModalConfig }) => {
  const { id = "", title = "", link } = modalConfig?.data ?? {};

  const handleDeleteFromServer = () => {
    CarouselApi.delete(id)
      .then(() => {
        setModalConfig({ show: false, data: null });
        fetchData();
      })
      .catch(() => window.alert('Error connect to server'));
  };

  return (
    <CustomModal
      title="Delete Carousel"
      maxWidth="sm"
      open={modalConfig.show && modalConfig.type === "delete"}
      setModalConfig={setModalConfig}
    >
      <SuiTypography mt={2} variant="h6">
        Carousel Title: {title}
      </SuiTypography>
      <SuiBox mt={2}>
        <img
          alt="carousel"
          style={{
            height: 200,
            width: '100%',
            objectFit: 'cover',
          }}
          src={link}
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

export default ModalDelete;