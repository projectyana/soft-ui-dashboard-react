
/* eslint-disable */
// Gallery Page



import React, { useEffect, useState } from "react";
import Axios from "axios";


// @mui material components
import {
    Icon,
    Switch,
    Tooltip,
    CardActions,
    Grid
} from "@mui/material";

import GalleryApi from 'apis/Gallery'


import { useFormik } from "formik";


import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import SuiBox from 'components/SuiBox';
import SuiButton from 'components/SuiButton';
import SuiTypography from 'components/SuiTypography';

import ImageCard from "components/Custom/Card/ImageCard";
import Select from "components/Custom/Select";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import ModalCreateCategory from "./components/ModalCreateCategory";
import ModalEditCategory from "./components/ModalEditCategory";
import ModalDeleteCategory from "./components/ModalDeleteCategory";

import ModalCreateGallery from "./components/ModalCreateGallery";
import ModalCreateFile from "./components/ModalCreateFile"






function Gallery() {
    const [fetchStatus, setFetchStatus] = useState({ loading: true });
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);

    const [modalConfig, setModalConfig] = useState({
        type: "create",    // create | edit | delete | configure
        show: false,
        data: null
    });
    const [modalConfigCategory, setModalConfigCategory] = useState({
        type: "create",    // create | edit | delete | configure
        show: false,
        data: null
    });

    const [modalConfigFile, setModalConfigFile] = useState({
        type: "create",    // create | edit | delete | configure
        show: false,
        data: null
    });



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



    const fetchData = () => {
        setFetchStatus({ loading: true })

        GalleryApi.get()
            .then((res) => {
                const mapData = res?.data?.data?.map((item) => ({
                    ...item,
                    link: `https://api.rokom.xyz/${item.url}`
                }));
                const categoryData = res?.data.data.map(({ id, title }) => ({ value: id, label: title }))
                setData(mapData ?? [])
                setCategories(categoryData ?? [])
            })
            .catch((err) => window.alert(err.message))
            .finally(() => setFetchStatus({ loading: false }))
    }




    const formik = useFormik({
        initialValues: {
            mediaType: ""
        }
    })

    const { setFieldValue, handleChange } = formik

    useEffect(() => {
        fetchData();
        console.log('value', categories)



        return () => { setData([]); setCategories([]) };
    }, [])



    return (
        <DashboardLayout>
            <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
                <SuiButton size="medium" color="info"

                    onClick={() => setModalConfig({ show: true, type: 'create' })}
                >
                    Create
                </SuiButton>

            </SuiBox>
            <SuiBox pb={2} display="flex" justifyContent="end" alignItems="center">
                <SuiButton size="medium" color="info"

                    onClick={() => setModalConfigFile({ show: true, type: 'create' })}
                >
                    Create Gallery File
                </SuiButton>
            </SuiBox>
            <SuiBox sx={{ minWidth: 120 }} display="flex" justifyContent="end" alignItems="center">
                <Select
                    placeholder="Select file or image"
                    option={options}
                    // value={options.value}
                    onChange={(option) => {
                        setFieldValue('mediaType', option.value)
                    }}

                />
            </SuiBox>
            <Grid container spacing={2} mt={2}>
                <SuiBox display="flex" justifyContent="space-between" style={{ marginLeft: '28px' }}>
                    <SuiTypography variant="h2">Categories</SuiTypography>
                    <SuiButton style={{ background: "none", marginLeft: '16px' }} onClick={() => setModalConfigCategory({ show: true, type: 'create' })}

                    >
                        <ControlPointIcon style={{ height: "auto", cursor: "pointer" }}
                        />
                    </SuiButton>
                </SuiBox>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: "-20px" }} >
                {data?.length > 0 && data.map((row, index) => (
                    <CardActions display='flex' style={{ flexDirection: 'column', alignItems: 'end' }} >
                        <SuiBox spacing={2} mt={2} display='flex' style={{ flexDirection: 'colomn', marginRight: "12px" }}>
                            <Icon size="small"
                                variant="text"
                                color="dark"
                                justifyContent="end"
                                style={{ cursor: "pointer", marginRight: '10px' }}
                                onClick={() => setModalConfigCategory({ show: true, type: "edit", data: row })}

                            >
                                edit
                            </Icon>
                            <Icon size="small"
                                variant="text"
                                justifyContent="end"
                                color="error"
                                onClick={() => setModalConfigCategory({ show: true, type: "delete", data: row })}

                                style={{ cursor: "pointer" }}>delete</Icon>
                        </SuiBox>
                        <SuiBox>
                            <SuiButton color="info" variant="contained"
                                style={{ width: '200px', marginTop: '8px', cursor: 'pointer' }}
                            >
                                {row.title}
                            </SuiButton>
                        </SuiBox>

                    </CardActions>

                ))
                }
            </Grid>
            <Grid container spacing={2} mt={2}>

                {data?.length > 0 && data.map((row, index) => (
                    <Grid key={row.title} item xs={6} md={3}>
                        <ImageCard
                            style={{ marginRight: 2 }}
                            alt={row.title}
                            image={row.icon}
                            title={row.title}
                            description={row.description}
                        >
                            <CardActions>
                                {/* <SuiBox>
                                    <Tooltip
                                        title={row?.active ? 'Caroursel is enabled' : 'Coursel is disabled'}
                                    >
                                        <Switch
                                            checked={row?.active ?? false}
                                            onChange={() => handleToggleActive(row, index)}
                                        />
                                    </Tooltip>
                                </SuiBox> */}
                                <SuiBox >
                                    <SuiButton
                                        size="small"
                                        variant="text"
                                        color="dark"
                                        onClick={() => setModalConfig({ show: true, type: "edit", data: row })}
                                    >
                                        <Icon>edit</Icon>&nbsp;edit
                                    </SuiButton>
                                </SuiBox>
                                <SuiBox >
                                    <SuiButton
                                        size="small"
                                        variant="text"
                                        color="error"
                                        onClick={() => setModalConfig({ show: true, type: "delete", data: row })}
                                    >
                                        <Icon>delete</Icon>&nbsp;delete
                                    </SuiButton>
                                </SuiBox>

                            </CardActions>

                        </ImageCard>


                    </Grid>
                ))
                }

            </Grid >

            {/* Modal  Create */}
            {modalConfig.show && modalConfig.type === "create" && <ModalCreateGallery
                fetchData={fetchData}
                categories={categories}
                modalConfig={modalConfig}
                setModalConfig={setModalConfig} />
            }


            {
                modalConfigCategory.show && modalConfigCategory.type === "create" && <ModalCreateCategory
                    fetchData={fetchData}
                    modalConfigCategory={modalConfigCategory}
                    setModalConfig={setModalConfigCategory}
                />
            }
            {
                modalConfigCategory.show && modalConfigCategory.type === "edit" && <ModalEditCategory
                    fetchData={fetchData}
                    modalConfigCategory={modalConfigCategory}
                    setModalConfig={setModalConfigCategory}
                />
            }
            {
                modalConfigCategory.show && modalConfigCategory.type === "delete" && <ModalDeleteCategory
                    fetchData={fetchData}
                    modalConfigCategory={modalConfigCategory}
                    setModalConfig={setModalConfigCategory}
                />
            }

            {
                modalConfigFile.show && modalConfigFile.type === "create" && <ModalCreateFile
                    fetchData={fetchData}
                    modalConfigFile={modalConfigFile}
                    setModalConfig={setModalConfigFile}
                />
            }


        </DashboardLayout>
    );
}

export default Gallery;