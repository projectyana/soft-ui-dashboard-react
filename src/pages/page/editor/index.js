/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import VisualEditor from "components/Custom/VisualEditor";
import { SelectCreateable } from "components/Custom/Select";

import PageApi from "apis/Page";
import BlogApi from "apis/Blog";

const PageEditor = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const [controller, dispatch] = useSoftUIController();
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdown, setDropdown] = useState({
    loading: true,
    tags: []
  });
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
    const finalValue = {
      ...values,
      tags: selectedTags.map(item => item.value).join(",")
    };

    action === "create"
      ? PageApi.create(finalValue)
        .then((res) => {
          navigate(-1, { replace: true });
        })
        .catch(({ response }) => {
          window.alert(response?.data?.message ?? "Error connect to server");
        })
      : PageApi.update(id, finalValue)
        .then((res) => {
          navigate(-1, { replace: true });
        })
        .catch(({ response }) => {
          window.alert(response?.data?.message ?? "Error connect to server");
        });
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

  const fetchDropdown = () => {
    BlogApi.getTags()
      .then((res) => setDropdown({ loading: false, tags: res?.data?.data?.map(tag => ({ value: tag, label: tag })) }))
      .catch(() => {
        setDropdown({ loading: false, tags: [] });
        window.alert("Unable get dropdown tags!");
      });
  };

  useEffect(() => {
    setMiniSidenav(dispatch, true);

    return () => {
      setMiniSidenav(dispatch, false);
    };
  }, [isFullscreen]);

  useEffect(() => {
    fetchDropdown();
    if (action === "edit") setSelectedTags(tags?.split(",").map(tag => ({ value: tag, label: tag })));
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
          </SuiBox>
        </SuiBox>
        <VisualEditor action={action} formik={formik} />
      </>
    </DashboardLayout>
  );
};

export default PageEditor;