import { useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";


import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiInput from 'components/SuiInput';


import GalleryApi from "apis/Gallery"
import CustomModal from 'components/Custom/Modal';
import InputImage from "./InputImage";
import { InputLabel, MenuItem, FormControl } from "@mui/material";
import Select from "components/Custom/Select";



function ModalCreate({ fetchData, modalConfig, setModalConfig }) {
    const [dataGambar, setDataGambar] = useState([]);
    const [uploadType, setUploadType] = useState('');




    const handleChangeFileType = (event) => {
        setUploadType(event.target.value);
    };


    const handleUploadImage = async () => {
        const formData = new FormData()
        formData.append('image', dataGambar[0]?.data);
        console.log('data add', formData)

        return GalleryApi.addFile(formData)
            .then((res) => res?.data)
            .catch((err) => { });


    }

    const formSubmitHandler = async (values, { setSubmitting }) => {
        const imageLink = await handleUploadImage()
        const finalValue = {
            ...values,
            image: dataGambar[0]?.nama,
            url: imageLink
        }
        console.log("----", finalValue)


        GalleryApi.create(finalValue)
            .then(({ data }) => {
                setModalConfig(prev => ({ ...prev, show: false }));
                fetchData();
            })
            .catch((err) => window.alert("Error connect to server"));
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            category: "",
            type: "",
            total: 0,
        },

        validationSchema: yup.object().shape({
            name: yup.string().required("Name is required"),
            category: yup.string().required("Category is required"),
            type: yup.string().required("Type is required"),
            total: yup.string().required("Total is required")
        }),
        onSubmit: formSubmitHandler,
    })
    const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

    console.log('data image', dataGambar)
    console.log('values', values)

    const options = [
        {
            value: "file",
            label: "File"
        },
        {
            value: "image",
            label: "Image"
        }
    ]
    return (
        <CustomModal
            title="Create new gallery"
            open={modalConfig.show && modalConfig.type === 'create'}
            setModalConfig={setModalConfig}
        >
            <InputImage dataGambar={dataGambar} setDataGambar={setDataGambar} />

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
                <SuiInput
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    value={values.category}
                    error={Boolean(errors.category && touched.category)}
                    errorMessage={errors?.category ?? ""}
                />
            </SuiBox>

            <SuiBox mb={2}>
                <SuiInput
                    name="type"
                    placeholder="Type"
                    onChange={handleChange}
                    value={values.type}
                    error={Boolean(errors.type && touched.type)}
                    errorMessage={errors?.type ?? ""}
                />
            </SuiBox>
            <SuiBox mb={2}>
                <SuiInput
                    name="total"
                    placeholder="Total"
                    onChange={handleChange}
                    value={values.total}
                    error={Boolean(errors.total && touched.total)}
                    errorMessage={errors?.total ?? ""}
                />
            </SuiBox>

            <SuiBox mb={2}>
                <SuiInput
                    multiline
                    rows={5}
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={values.description}
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

export default ModalCreate;