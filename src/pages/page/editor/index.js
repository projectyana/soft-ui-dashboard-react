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

import VisualEditor from "components/Custom/VisualEditor";

import PageApi from "apis/Page";

const PageEditor = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const [controller, dispatch] = useSoftUIController();
  const isFullscreen = window.innerHeight == screen.height;
  const {
    id = null,
    title = "",
    slug = "",
    tags = "",
    html_content = "",
    css_content = ""
  } = useLocation()?.state || {};

  // Submit to server
  const formSubmitHandler = (values, { setSubmitting }) => {

    action === "create"
      ? PageApi.create(values)
        .then((res) => {
          navigate(-1, { replace: true });
        })
        .catch((err) => window.alert("Error connect to server"))
      : PageApi.update(id, values)
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
      html_content: action === "edit" ? html_content : "",
      css_content: action === "edit" ? css_content : ""
    },
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange } = formik;

  useEffect(() => {
    setMiniSidenav(dispatch, true);

    return () => {
      setMiniSidenav(dispatch, false);
    };
  }, [isFullscreen]);

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
        <VisualEditor action={action} formik={formik} />
      </>
    </DashboardLayout>
  );
};

export default PageEditor;