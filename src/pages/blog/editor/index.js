/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import TextEditor from "components/Custom/TextEditor";

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

  useEffect(() => {
    if (action === "edit") setDataGambar([{ link }]);

    return () => { };
  }, []);


  return (
    <DashboardLayout>
      <>
        <SuiBox mt={2} mb={2} display="flex" justifyContent="flex-start" >
          <SuiBox mr={2}>
            <SuiInput
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={values.title}
              error={Boolean(errors.title && touched.title)}
              errorMessage={errors?.title ?? ""}
            />
          </SuiBox>

          <SuiBox>
            <SuiInput
              name="tags"
              placeholder="Tags"
              onChange={handleChange}
              value={values.tags}
              error={Boolean(errors.tags && touched.tags)}
              errorMessage={errors?.tags ?? ""}
            />
          </SuiBox>
        </SuiBox>
        <TextEditor action={action} formik={formik} dataGambar={dataGambar} setDataGambar={setDataGambar} />
      </>
    </DashboardLayout>
  );
};

export default BlogEditor;