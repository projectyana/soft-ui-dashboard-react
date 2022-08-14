/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { Grid } from '@mui/material';

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav } from "context";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import VisualEditor from "components/Custom/VisualEditor";
import TextEditor from "components/Custom/TextEditor";
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
    type = "",
    id = null,
    title = "",
    slug = "",
    tags = "",
    html_content = "",
    css_content = ""
  } = useLocation()?.state || {};

  // some delay function before submit
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Submit to server
  const formSubmitHandler = async (values, { setSubmitting }) => {
    await sleep(900);

    const finalValue = {
      ...values,
      tags: selectedTags.map(item => item.value).join(",")
    };

    console.log(finalValue);

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

  const { values, errors, touched, handleChange, handleSubmit } = formik;

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
          <SuiInput
            name="slug"
            placeholder="Slug"
            onChange={handleChange}
            value={values.slug}
            error={Boolean(errors.slug && touched.slug)}
            errorMessage={errors?.slug ?? ""}
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
          {type === "builder"
            ? <VisualEditor action={action} formik={formik} />
            : <TextEditor action={action} formik={formik} />}
        </Grid>

        <Grid item md={12}>
          <SuiBox mt={2}>
            <SuiButton
              mt={2}
              size="medium"
              color="info"
              onClick={() => handleSubmit()}>
              {action === "edit" ? "Save Update" : "Create"}
            </SuiButton>
          </SuiBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default PageEditor;