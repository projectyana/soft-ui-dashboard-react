/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import Grid from '@mui/material/Grid';

import { useSoftUIController, setMiniSidenav } from "context";

import SuiInput from "components/SuiInput";
import SuiBox from "components/SuiBox";
import TextEditor from "components/Custom/TextEditor";
import { SelectCreateable } from "components/Custom/Select";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";



import BlogApi from "apis/Blog";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { action } = useParams(); // create || edit
  const [controller, dispatch] = useSoftUIController();
  const {
    id = null,
    title = "",
    tags = "",
    content = "",
    link = ""
  } = useLocation()?.state || {};
  const [dataGambar, setDataGambar] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdown, setDropdown] = useState({
    loading: true,
    tags: []
  });

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", dataGambar[0]?.data);

    return BlogApi.upload(formData)
      .then((res) => res?.data?.data)
      .catch((err) => { });
  };

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    if (dataGambar.length > 0) {
      const imageLink = await handleUploadImage();
      const finalValue = {
        ...values,
        thumbnail: imageLink,
        tags: selectedTags.map(item => item.value).join(",")
      };

      action === "create"
        ? BlogApi.create(finalValue)
          .then((res) => {
            navigate(-1, { replace: true });
          })
          .catch((err) => window.alert("Error connect to server"))
        : BlogApi.update(id, finalValue)
          .then((res) => {
            navigate(-1, { replace: true });
          })
          .catch((err) => window.alert("Error connect to server"));
    }
    else {
      window.alert("Blog thumbnail is required!");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: action === "edit" ? title : "",
      tags: action === "edit" ? tags : "",
      content: action === "edit" ? content : "",
    },
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange } = formik;

  const fetchDropdown = () => {
    BlogApi.getTags()
      .then((res) => setDropdown({ loading: false, tags: res?.data?.data?.map(tag => ({ value: tag, label: tag })) }))
      .catch(() => {
        setDropdown({ loading: false, tags: [] });
        window.alert("Unable get dropdown tags!");
      });
  };

  useEffect(() => {
    fetchDropdown();
    if (action === "edit") setDataGambar([{ link }]);
    if (action === "edit") setSelectedTags(tags.split(",").map(tag => ({ value: tag, label: tag })));

    return () => { };
  }, []);

  return (
    <DashboardLayout>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item md={12}>
          <SuiInput
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={values.title}
            error={Boolean(errors.title && touched.title)}
            errorMessage={errors?.title ?? ""}
          />
        </Grid>
        <Grid item md={12}>
          <SelectCreateable
            isMulti={true}
            placeholder="Tags"
            option={dropdown?.tags}
            defaultValue={selectedTags ?? []}
            value={selectedTags}
            onChange={setSelectedTags}
            isLoading={dropdown.loading}
            menuPortalTarget={document.body}
          />
        </Grid>
        <Grid item md={12}>
          <TextEditor action={action} formik={formik} dataGambar={dataGambar} setDataGambar={setDataGambar} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default BlogEditor;