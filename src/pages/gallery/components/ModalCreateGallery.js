import { useFormik } from "formik";
import * as yup from "yup";

import { useEffect, useState } from "react";


import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';


import GalleryApi from "apis/Gallery";
import CustomModal from 'components/Custom/Modal';
import { InputLabel, MenuItem, FormControl } from "@mui/material";
import { Select } from "components/Custom/Select";
import InputImage from "./InputImage";




function ModalCreateGallery({ fetchData, modalConfig, setModalConfig, categories }) {
    const [id, setId] = ('');

    const [dataGambar, setDataGambar] = useState([]);


    const handleUploadImage = async () => {
        const formData = new FormData();
        formData.append('image', dataGambar[0]?.data);
        console.log('data add', formData);

        // return GalleryApi.addFile(formData)
        //     .then((res) => res?.data)
        //     .catch((err) => { });


    };

    const formSubmitHandler = async (values, { setSubmitting }) => {
        console.log('submitted');
        const imageLink = await handleUploadImage();

        const formData = new FormData();
        const finalValue = {
            ...values,
            image: dataGambar[0]?.nama,
        };

        formData.append('name', values?.name);
        formData.append('image', dataGambar[0].nama);


        console.log("----", formData);
        console.log("----", values.name);
        console.log("----", values.gallery_id);



        GalleryApi.addFile(values.gallery_id, formData)
            .then(({ data }) => {
                setModalConfig(prev => ({ ...prev, show: false }));
                fetchData();
            })
            .catch((err) => window.alert(err));
    };

    const formik = useFormik({
        initialValues: {
            gallery_id: "",
            name: ""
        },

        validationSchema: yup.object().shape({
            gallery_id: yup.string().required("Category is required"),
            name: yup.string().required("Name is required"),

        }),
        onSubmit: formSubmitHandler,
    });

    const { values, errors, touched, handleChange, setFieldValue, isSubmitting, handleSubmit } = formik;

    console.log('data image', dataGambar?.[0]?.nama);

    console.log('values gallery id', values.gallery_id);

    return (
        <CustomModal
            title="Create new gallery"
            open={modalConfig.show && modalConfig.type === 'create'}
            setModalConfig={setModalConfig}
        >
            <InputImage dataGambar={dataGambar} setDataGambar={setDataGambar} />

            <SuiBox mt={3} mb={2}>
                <SuiInput
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={values.name}
                    error={Boolean(errors.name && touched.name)}
                    errorMessage={errors?.name ?? ""}
                />
            </SuiBox>
            <SuiBox mb={2} pt={2}>
                <Select
                    // key={values.gallery_id}
                    placeholder="Select Category"
                    // defaultValue={values.gallery_id ? categories?.find(category => category?.value === values.gallery_id) : ""}
                    option={categories}
                    onChange={(option) => setFieldValue('gallery_id', option.value)}
                    error={Boolean(errors.gallery_id && touched.gallery_id)}
                    errorMessage={errors?.gallery_id ?? ""}
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

export default ModalCreateGallery;