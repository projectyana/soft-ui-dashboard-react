/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Chip,
  Icon,
  Grid,
  Tooltip
} from "@mui/material";

import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';
import GalleryCard from "components/Custom/Card/GalleryCard";
import { LoadingState } from "components/Custom/Loading";

import GalleryApi from 'apis/Gallery';
import getRolePermissions from "utils/getRolePermissions";

// Category Component
import ModalCreateCategory from "./gallery/category/ModalCreateCategory";
import ModalEditCategory from "./gallery/category/ModalEditCategory";
import ModalDeleteCategory from "./gallery/category/ModalDeleteCategory";

// Gallery Component
import ModalCreateGallery from "./gallery/ModalCreateGallery";
import ModalDeleteGallery from "./gallery/ModalDeleteGallery";

const CategoriesView = ({ modalCreate, setModalCreate }) => {
  const { isAllowWrite, isAllowDelete } = getRolePermissions();
  const [dataCat, setDataCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [loading, setLoading] = useState({ gallery: false });
  const [gallery, setGallery] = useState([]);
  const [modalConfig, setModalConfig] = useState({ show: false, type: "", data: null });
  const [modalConfigCategory, setModalConfigCategory] = useState({ show: false, type: "", data: null });

  const fetchCategories = () => {
    GalleryApi.getGalleryCategories(selectedCat)
      .then(res => {
        const categories = res.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        setDataCat(categories ?? []);
        setSelectedCat(categories[0]?.id ?? null);
      });
  };

  const fetchGallery = () => {
    setLoading(prev => ({ ...prev, gallery: true }));
    GalleryApi.getSingleGallery(selectedCat)
      .then(res => {
        setGallery(res?.data?.data?.assets_path.map(item => ({ path: item, full_path: `https://api.rokom.xyz/${item}` })));
      })
      .finally(() => setLoading(prev => ({ ...prev, gallery: false })));
  };

  useEffect(() => fetchCategories(), []);

  useEffect(() => {
    if (selectedCat) fetchGallery();

  }, [selectedCat]);

  return (
    <>
      {/* Create Image gallery categories */}
      <SuiBox mb={1} display="flex" justifyContent="start" alignItems="center" >
        <SuiTypography variant="h2">Categories</SuiTypography>
        {isAllowWrite && (
          <Tooltip title="Create new Gallery Category">
            <SuiButton
              rounded="small"
              sx={{ marginTop: 0.5, marginLeft: 1, padding: 1 }}
              iconOnly
              size="small"
              color="info"
              onClick={() => setModalConfigCategory({ show: true, type: 'create' })} >
              <Icon>add</Icon>
            </SuiButton>
          </Tooltip>
        )}
      </SuiBox >

      {/* Chip category */}
      <SuiBox pb={2} display="flex" flexWrap="wrap" justifyContent="start" alignItems="center">
        {dataCat?.length > 0 && dataCat.map((row) => (
          <Chip
            sx={{ margin: 0.5, textTransform: "capitalize" }}
            label={row.title}
            onClick={() => setSelectedCat(row.id)}
            onDelete={isAllowWrite ? () => setModalConfigCategory({ show: true, type: 'edit', data: row }) : null}
            deleteIcon={isAllowWrite ? <Icon>edit</Icon> : null}
            variant="outlined"
            color={row.id === selectedCat ? "info" : "secondary"}
          />
        ))}
      </SuiBox>

      {loading.gallery
        ? (
          <SuiBox mt={1}>
            <LoadingState />
          </SuiBox>
        )
        : gallery?.length > 0
          ? (<Grid container spacing={2}>
            {gallery?.length > 0 && gallery.map((row, index) => (
              <Grid key={row.path} item xs={6} md={4}>
                <GalleryCard
                  image={row.full_path}
                  onDeleteClick={() => setModalConfig({ show: true, type: 'delete', data: { link: row, id: selectedCat }, })}
                />
              </Grid>
            ))}
          </Grid>
          )
          : (
            <SuiBox mt={1}>
              <SuiTypography variant="h5">No Images Found</SuiTypography>
            </SuiBox>
          )
      }

      {/* Modal Create Gallery */}
      {modalCreate.show && modalCreate.type === "gallery" && (
        <ModalCreateGallery fetchData={fetchGallery} modalConfig={modalCreate} setModalConfig={setModalCreate} categories={dataCat} />
      )}

      {/* Modal Delete Gallery */}
      {modalConfig.show && modalConfig.type === "delete" && (
        <ModalDeleteGallery fetchData={fetchGallery} modalConfig={modalConfig} setModalConfig={setModalConfig} />
      )}

      {/* Modal Create Category */}
      {modalConfigCategory.show && modalConfigCategory.type === "create" &&
        <ModalCreateCategory
          fetchData={fetchCategories}
          modalConfigCategory={modalConfigCategory}
          setModalConfig={setModalConfigCategory}
        />}

      {/* Modal Edit Category */}
      {modalConfigCategory.show && modalConfigCategory.type === "edit" &&
        <ModalEditCategory
          fetchData={fetchCategories}
          modalConfigCategory={modalConfigCategory}
          setModalConfig={setModalConfigCategory}
        />
      }

      {/* Modal Delete Category */}
      {modalConfigCategory.show && modalConfigCategory.type === "delete" &&
        <ModalDeleteCategory
          fetchData={fetchCategories}
          modalConfigCategory={modalConfigCategory}
          setModalConfig={setModalConfigCategory}
        />
      }
    </>
  );
};

export default CategoriesView;