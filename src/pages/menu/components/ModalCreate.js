/* eslint-disable */

/**
 * Modal to create parent menu or sub menu
 *  
 * */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Tooltip
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

const ModalCreate = ({ fetchData, modalConfig, setModalConfig }) => {
  const [fetchStatus, setFetchStatus] = useState({ loading: true });
  const [dropdown, setDropdown] = useState({
    parent_menu: [],
    page: [],
    blog: [],
    image_gallery: [],
    doc_gallery: []
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

    // if user create parent menu
    if (values.menu_state === "parent") {
      const finalValue = valueFormater(values);

      MenuApi.create(finalValue)
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch(() => window.alert("Error connect to server"));
    }

    // if user create sub parent menu
    if (values.menu_state === "sub") {
      const finalValue = valueFormater(values);

      MenuApi.createSubmenu(values.id_parent, finalValue)
        .then(({ data }) => {
          setModalConfig(prev => ({ ...prev, show: false }));
          fetchData();
        })
        .catch(() => window.alert("Error connect to server"));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",                 // required
      menu_state: "parent",     // parent/sub
      id_parent: "",            // id_parent is required when menu_state is sub 
      menu_type: "page",        // page, blog, link, image, doc
      content: "",              // content is required when menu_type is page or blog
      link: "",                 // link is required when menu_type is link
      gallery: []               // gallery is required when menu_type is image/doc
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Menu Name is required!"),
      menu_state: yup.string().required("Menu State is required!"),
      id_parent: yup.string().when('menu_state', {
        is: (menu_state) => Boolean(menu_state === 'sub'),
        then: yup.string().required("Parent Menu is required!")
      }),
      menu_type: yup.string().required("Menu Type is required!"),
      content: yup.string().when('menu_type', {
        is: (menu_type) => Boolean(menu_type === 'page' || menu_type === 'blog'),
        then: yup.string().required(`Content is required!`),
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
      MenuApi.getParent(),
      MenuApi.getPageUnlinked(),
      MenuApi.getBlogUnlinked(),
      GalleryApi.getGalleryCategories(),
      FileUploadApi.getCategories(),
    ])
      .then((Axios.spread((resParent, resPage, resBlog, resGalleryCat, resFileCat) => {
        const mapParent = resParent.data.data.map(item => ({ ...item, value: item.id, label: item.name }));
        const mapPage = resPage.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        const mapBlog = resBlog.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        const mapImage = resGalleryCat.data.data.map(item => ({ ...item, value: item.id, label: item.title }));
        const mapDoc = resFileCat?.data?.data?.map(({ sub_categories }) => sub_categories ?? [])?.flat()?.map(item => ({ ...item, value: item.id, label: item.name })) ?? [];

        setDropdown(prev => ({
          ...prev,
          parent_menu: mapParent,
          page: mapPage,
          blog: mapBlog,
          image_gallery: mapImage,
          doc_gallery: mapDoc
        }));
      })))
      .catch(() => window.alert("Error connect to server"))
      .finally(() => setFetchStatus({ loading: false }));
  };

  useEffect(() => {
    getInitialData();

    return () => { };
  }, []);


  return (
    <CustomModal
      title="Create Menu"
      open={modalConfig.show && modalConfig.type === 'create'}
      setModalConfig={setModalConfig}
      maxWidth="md"
    >
      {fetchStatus.loading
        ? <LoadingState />
        : <SuiBox>
          <SuiBox mb={2}>
            <SuiInput
              key="name"
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
              <FormLabel id="menu_state">
                <SuiTypography variant="subtitle2">
                  Create menu as
                </SuiTypography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="menu_state"
                name="menu_state"
                value={values.menu_state}
                onChange={e => setValues({ ...values, menu_state: e.target.value })}
              >
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="parent" control={<Radio />} label="Parent" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="sub" control={<Radio />} label="Sub Parent" />
              </RadioGroup>
            </FormControl>
          </SuiBox>

          <SuiBox mb={2}>
            {/* Show select dropdown if menu_state equals sub (User create sub parent menu)*/}
            {Boolean(values.menu_state === "sub") && (
              <Select
                placeholder="Select Parent Menu"
                option={dropdown?.parent_menu ?? []}
                defaultValue={dropdown?.parent_menu?.find(item => item.value === values.id_parent)}
                onChange={(option) => setValues({ ...values, id_parent: option.value })}
                error={Boolean(errors.id_parent && touched.id_parent)}
                errorMessage={!!(errors?.id_parent && touched.id_parent) ? errors.id_parent : ""}
              />
            )}
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
                value={values.menu_type}
                onChange={(e) => setValues({ ...values, menu_type: e.target.value, content: "", gallery: [] })}
              >
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="page" control={<Radio />} label="Page" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="blog" control={<Radio />} label="Blog" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="link" control={<Radio />} label="Link" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="doc_gallery" control={<Radio />} label="Document" />
                <FormControlLabel sx={{ marginX: 1 }} size="small" value="image_gallery" control={<Radio />} label="Image" />
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
                onChange={(option) => setValues({ ...values, content: option.id })}
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

export default ModalCreate;