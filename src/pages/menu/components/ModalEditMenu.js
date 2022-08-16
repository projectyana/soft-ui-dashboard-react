/* eslint-disable */

/**
 * Modal to change/edit sub menu type & name
 * eg: update existing submenu type from page become blog or link
 */

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio
} from "@mui/material";

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import CustomModal from "components/Custom/Modal";
import SuiTypography from "components/SuiTypography";
import { Select } from "components/Custom/Select";
import { LoadingState } from "components/Custom/Loading";

import MenuApi from "apis/Menu";
import GalleryApi from "apis/Gallery";
import FileUploadApi from "apis/FileUpload";

const ModalEditMenu = ({ fetchParent, modalConfig, setModalConfig }) => {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [dataSingle, setDataSingle] = useState({});
  const [dropdown, setDropdown] = useState({
    parent_menu: [],
    page: [],
    blog: [],
    image_gallery: [],
    doc_gallery: [],
  });

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {
    const valueFormater = values => {
      const finalValue = {
        name: values.name,
        type: values.menu_type
      };

      // if user  parent/sub menu as link
      if (values.menu_type == "link") {
        finalValue.content = { url: values.link };
      }
      else if (values.menu_type == "image_gallery" || values.menu_type == "doc_gallery") {
        finalValue.content = { category_ids: values?.gallery.map(selected => selected.id) };
      }
      else {
        // if user create parent/sub menu as page/blog
        finalValue.content = { [`${values.menu_type}_id`]: values.content };
      }

      return finalValue;
    };

    const finalValue = valueFormater(values);

    MenuApi.update(modalConfig.data.id, finalValue)
      .then(res => {
        setModalConfig({ ...modalConfig, show: false });
        fetchParent();
      })
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to update menu"));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: modalConfig.data.name ?? "",
      id_parent: dataSingle?.parent_id ?? "",            // id_parent is required when menu_state is sub 
      menu_type: dataSingle?.type ?? "",                 // page, blog, link, image_gallery, doc_gallery
      content: dataSingle?.content?.id ?? "",            // content is required when menu_type is page or blog
      link: dataSingle?.content?.url ?? "",
      gallery: dataSingle?.gallery ?? []
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Menu Name is required!"),
      menu_type: yup.string().required("Menu Type is required!"),
      content: yup.string().when('menu_type', {
        is: (menu_type) => Boolean(menu_type === 'page' || menu_type === 'blog'),
        then: yup.string().required("Content is required!")
      }),
      link: yup.string().when('menu_type', {
        is: (menu_type) => Boolean(menu_type === 'link'),
        then: yup.string().required("Link is required!")
      }),
      gallery: yup.array().of(yup.object()).when('menu_type', {
        is: (menu_type) => Boolean(menu_type === 'image_gallery' || menu_type === 'doc_gallery'),
        then: yup.array().of(yup.object()).min(1, "Select min. 1 category").required("Category is required!")
      }),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, setValues, handleSubmit } = formik;

  const getInitialData = () => {

    Axios.all([
      MenuApi.getSingle(modalConfig.data.id),
      MenuApi.getParent(),
      MenuApi.getPageUnlinked(),
      MenuApi.getBlogUnlinked(),
      GalleryApi.getGalleryCategories(),
      FileUploadApi.getCategories(),
    ])
      .then((Axios.spread((resSingle, resParent, resPage, resBlog, resGalleryCat, resFileCat) => {
        const { type, content } = resSingle?.data?.data ?? {};

        // get previous selected blog /page to join with unlinked array
        const previousContent = { value: content?.id, label: content?.title };

        const mapParent = resParent.data.data.map(item => ({ ...item, value: item.id, label: item.name }));
        const mapPage = resPage.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        const mapBlog = resBlog.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        const mapImage = resGalleryCat.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        // const mapDoc = resFileCat?.data?.data?.map(({ sub_categories }) => sub_categories ?? [])?.flat()?.map(item => ({ ...item, value: item.id, label: item.name })) ?? [];
        const mapDoc = resFileCat?.data?.data?.map((item) => ({ ...item, value: item.id, label: item.name })) ?? [];

        // map single data gallery
        const mapGallery = (type === 'image_gallery' || type === "doc_gallery") ? content?.map(gal => ({ ...gal, value: gal.id, label: gal.title ?? gal.name })) : [];

        setDataSingle({
          ...resSingle.data.data,
          gallery: mapGallery ?? [],
        });
        setDropdown(prev => ({
          ...prev,
          parent_menu: mapParent,
          page: type === "page" ? [previousContent].concat(mapPage) : mapPage,
          blog: type === "blog" ? [previousContent].concat(mapBlog) : mapBlog,
          image_gallery: mapImage,
          doc_gallery: mapDoc
        }));
      })))
      .catch(({ response }) => window.alert(response?.data?.message ?? "Unable to perform this action!"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    getInitialData();

    return () => { };
  }, []);


  return (
    <CustomModal
      title={`Edit | ${modalConfig.data.name}`}
      open={modalConfig.show}
      setModalConfig={setModalConfig}
      maxWidth="md"
    >
      {fetchStatus.loading
        ? <LoadingState />
        : <SuiBox>
          <SuiBox mb={2}>
            <SuiInput
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={values.name}
              error={Boolean(errors.name && touched.name)}
              errorMessage={errors?.name ?? ""}
            />
          </SuiBox>

          <SuiBox mb={2}>
            <FormControl>
              <FormLabel id="menu_type">
                <SuiTypography variant="subtitle2">
                  Choose menu type
                </SuiTypography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="menu_type"
                name="menu_type"
                defaultValue={values.menu_type}
                onChange={(e) => {
                  const isExactPrevType = e.target.value === dataSingle.type;
                  setValues({ ...values, menu_type: e.target.value, gallery: isExactPrevType ? dataSingle.gallery : [] });
                }
                }
              >
                <FormControlLabel sx={{ marginX: 1 }} size="small" checked={values.menu_type === "page"} value="page" control={<Radio />} label="Page" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" checked={values.menu_type === "blog"} value="blog" control={<Radio />} label="Blog" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" checked={values.menu_type === "link"} value="link" control={<Radio />} label="Link" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" checked={values.menu_type === "doc_gallery"} value="doc_gallery" control={<Radio />} label="Document" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" checked={values.menu_type === "image_gallery"} value="image_gallery" control={<Radio />} label="Image" />
              </RadioGroup>
            </FormControl>
          </SuiBox>

          <SuiBox mb={2}>
            {/* Show select dropdown if user choose blog/page */}
            {Boolean(values.menu_type === "page" || values.menu_type === "blog") && (
              <Select
                key={values.menu_type}
                placeholder={`Select ${values.menu_type}`}
                option={values.menu_type === "page" ? dropdown?.page : dropdown?.blog}
                defaultValue={dropdown[values.menu_type]?.find(item => item.value === values.content)}
                onChange={(option) => setValues({
                  ...values,
                  content: option.id,
                  type: option.type
                })}
                error={Boolean(errors.content && touched.content)}
                errorMessage={!!(errors?.content && touched?.content) ? errors.content : ""}
              />
            )}

            {values.menu_type === "link" && (
              <SuiInput
                name="link"
                placeholder="https://"
                onChange={handleChange}
                value={values.link}
                error={Boolean(errors.link && touched.link)}
                errorMessage={errors?.link ?? ""}
              />
            )}

            {Boolean(values.menu_type === "image_gallery" || values.menu_type === "doc_gallery") && (
              <Select
                isMulti
                key={values.menu_type}
                placeholder={`Select ${values.menu_type === "image_gallery" ? "image" : "document"} gallery`}
                option={dropdown[values.menu_type] ?? []}
                defaultValue={dropdown[values.menu_type]?.find(item => item.value === values.content)}
                value={values.gallery}
                onChange={(options) => setValues({ ...values, gallery: options })}
                error={Boolean(errors.gallery && touched.gallery)}
                errorMessage={!!(errors?.gallery && touched?.gallery) ? errors.gallery : ""}
              />
            )}
          </SuiBox>

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
              mt={2}
              size="medium"
              color="info"
              onClick={handleSubmit}>
              Save
            </SuiButton>
          </SuiBox>
        </SuiBox>
      }
    </CustomModal >);
};

export default ModalEditMenu;