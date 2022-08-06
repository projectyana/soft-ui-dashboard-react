
import { useFormik, validateYupSchema } from 'formik';
import * as yup from "yup";
import CustomModal from 'components/Custom/Modal';
import GalleryApi from "apis/Gallery"

import React from 'react';

import SuiBox from 'components/SuiBox';
import SuiInput from 'components/SuiInput';
import SuiButton from 'components/SuiButton';





function ModalCreateCategory({ fetchData, modalConfigCategory, setModalConfig }) {

    const formSubmitHandler = (values, { setSubmitting }) => {
        console.log('submitted', values)
        GalleryApi.create(values)
            .then(({ data }) => {
                setModalConfig(prev => ({ ...prev, show: false }));
                fetchData();
            })
            .catch((err) => window.alert("Error connect to server"));
        console.log('values category', values)
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            icon: ""
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is required!"),
            icon: yup.string().required("Icon is required!"),
        }),
        onSubmit: formSubmitHandler,
    })

    const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;
    console.log(modalConfigCategory)


    return (
        <CustomModal
            title="Create new category"
            // open={modalConfig.show && modalConfig.type === 'create'}
            open={modalConfigCategory.show && modalConfigCategory.type === 'create'}
            setModalConfig={setModalConfig}
        >
            <SuiBox mb={2}>
                <SuiInput
                    name="title"
                    placeholder="Category Title"
                    onChange={handleChange}
                    value={values.title}
                    error={Boolean(errors.title && touched.title)}
                    errorMessage={errors?.title ?? ""}
                />
            </SuiBox>

            <SuiBox mb={2}>
                <SuiInput
                    name="icon"
                    placeholder="Icon"
                    onChange={handleChange}
                    value={values.icon}
                    error={Boolean(errors.icon && touched.icon)}
                    errorMessage={errors?.icon ?? ""}
                />
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

        </CustomModal>

    );
}

export default ModalCreateCategory;