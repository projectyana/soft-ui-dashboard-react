/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import TextEditor from "components/Custom/TextEditor";

import BlogApi from "apis/Blog";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { action } = useParams(); // create || edit
  const [controller, dispatch] = useSoftUIController();
  const {
    id = null,
    title = "",
    slug = "",
    tags = "",
    content = ""
  } = useLocation()?.state || {};

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {

    action === "create"
      ? BlogApi.create(values)
        .then((res) => {
          navigate(-1, { replace: true });
        })
        .catch((err) => window.alert("Error connect to server"))
      : BlogApi.update(id, values)
        .then((res) => {
          navigate(-1, { replace: true });
        })
        .catch((err) => window.alert("Error connect to server"));
  };

  const formik = useFormik({
    initialValues: {
      title: action === "edit" ? title : "",
      slug: action === "edit" ? slug : "",
      tags: action === "edit" ? tags : "",
      content: action === "edit" ? content : "",
    },
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange } = formik;

  return (
    <DashboardLayout>
      <DashboardNavbar />
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

          <SuiBox mr={2}>
            <SuiInput
              name="slug"
              placeholder="Slug"
              onChange={handleChange}
              value={values.slug}
              error={Boolean(errors.slug && touched.slug)}
              errorMessage={errors?.slug ?? ""}
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
        <TextEditor action={action} formik={formik} />
      </>
    </DashboardLayout>
  );
};

export default BlogEditor;