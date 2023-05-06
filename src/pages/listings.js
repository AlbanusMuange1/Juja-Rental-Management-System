import {useFormik} from 'formik';
import {Link as RouterLink, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
// material
import {Avatar, Box, Button, Card, Container, Grid, Link, Stack, styled, Typography} from '@mui/material';
// components
import Page from '../components/Page';
import {
    ProductSort,
    ProductList,
    ProductCartWidget,
    ProductFilterSidebar
} from '../sections/@dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import axios from "axios";
import ShopProductCard from "../sections/@dashboard/products/ProductCard";
import Label from "../components/Label";
import ColorPreview from "../components/ColorPreview";
import {fCurrency} from "../utils/formatNumber";
import AlertDialog from "../components/AppDialog/AppDialog";
import RegisterHouseForm from "../components/registerHouse";
import {ShowAppDialogContext} from "../components/contexts/contexts";

import RegisterTenantForm from "../components/registerTenantForm";


const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'Image',
    position: 'absolute',
    transition: 'transform .4s ease-in-out',
    '&:hover': {
        transform: "scale(1.5)"
    },
});

// ----------------------------------------------------------------------

export default function Listings({match}) {

    const [house, setHouse] = useState([]);
    const [apartment, setApartment] = useState([]);
    const [amenities, setFeatures] = useState([]);

    const {showAppDialog, setShowAppDialog, showEditDialog, handleShowAppDialog, uploadedImage, uploadedThumbUrl} = useContext(ShowAppDialogContext);

    let params = useParams();

    let h;
    const [table_head, setTableHead] = useState([]);
    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/houses?Id=" + params.Id).then((response) => {
            setHouse(response.data.info[0]);
            h = response.data.info[0];
            let temp = [];
            for (let i in response.data.info[0].Features) {
                if (response.data.info[0].Features.hasOwnProperty(i)) {
                    temp.push(
                        <li>
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    // color: 'text.disabled',
                                    // textDecoration: 'line-through'
                                }}
                            >{i}</Typography> :
                            <Label
                                variant="filled"
                                color={'info'}
                                sx={{
                                    zIndex: 9,
                                    top: 16,
                                    right: 16,
                                    textTransform: 'uppercase'
                                }}
                            >{response.data.info[0].Features[i]}</Label>
                        </li>)
                }
            }

            console.log(response.data.info[0].Features)
            setFeatures(temp);
            return (response.data.info[0]);
        }).then((response) => {
            axios.get("https://rent-app-master.herokuapp.com/api/apartment?Id=" + response.ApartmentId).then((response) => {
                setApartment(response.data.info[0]);
                setTableHead([
                    {id: 'Id', label: 'Id', alignRight: false},
                    {id: 'Name', label: 'Name', alignRight: false},
                    {id: 'Phone Number', label: 'Phone Number', alignRight: false},
                    {id: 'Occupation', label: 'Occupation', alignRight: false},
                    {id: 'Postal Address', label: 'Postal Address', alignRight: false},
                    {id: 'County', label: 'County', alignRight: false},
                    {id: 'Next of kin Name', label: 'Next of kin Name', alignRight: false},
                    {id: 'Next of kin Phone Number', label: 'Next of kin Phone Number', alignRight: false},
                    {id: 'Next of kin Nature Of RelationShip', label: 'Next of kin Nature Of RelationShip', alignRight: false},
                    {id: 'HouseId', label: 'HouseId', defaultValue: h, alignRight: false},
                    {id: 'ApartmentId', label: 'ApartmentId', defaultValue: response.data.info[0], alignRight: false},
                ]);
                console.log(response.data.info[0]);
            })
        })
    }, []);

    const handleTextInput = () => {
        /*let el = document.querySelector(".register-user-form");
        let form_data = {};
        el.querySelectorAll(".master").forEach((div) => {
            let field = div.querySelector("label").innerText.split("*")[0].trim();
            if (field === "Image") {
                form_data[field] = uploadedImage;
                form_data["ThumbUrl"] = uploadedThumbUrl;

            } else if (field === "Features") {
                let value = div.querySelector("input").value;
                value = JSON.parse(value.toString());
                form_data[field] = value;
            } else {
                let value = div.querySelector("input");
                if (!value) {
                    value = div.querySelector("select");
                }
                form_data[field] = value.value;
            }
        });
        axios.post("https://rent-app-master.herokuapp.com/api/houses", [form_data]).then((response) => {
            console.log(response.data.info);
            setListUpdate(!listUpdate);
        });
        console.log(form_data);*/

    };

    return (
        <Page title="Dashboard: Display house | Rent Management">
            {showAppDialog && !showEditDialog ? (
                <AlertDialog
                    title={`Tenant Registration Form`}
                    handleTextInput={handleTextInput}
                    component={
                        <RegisterTenantForm
                            tableHead={table_head}
                        />
                    }
                />
            ) : null}
            <Container>
                <Typography variant="h4" sx={{mb: 5}}>
                    Top Houses
                </Typography>
                <Grid container>
                    <Grid key={house.Id} item md={6} xs={12}>
                        <Card>
                            <Box sx={{pt: '100%', position: 'relative', overflow: 'hidden'}}>
                                {"Status" && (
                                    <Label
                                        variant="filled"
                                        color={("Status" === 'Inactive' && 'error') || 'info'}
                                        sx={{
                                            zIndex: 9,
                                            top: 16,
                                            right: 16,
                                            position: 'absolute',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {house.Status}
                                    </Label>
                                )}
                                <ProductImgStyle alt={house.Type} src={house.Image}/>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Stack spacing={1} sx={{p: 1}}>
                            <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                <Typography variant="subtitle2" noWrap>
                                    {house.Type}
                                </Typography>
                            </Link>

                            <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                <Typography variant="subtitle2" noWrap>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Avatar alt={house.Type} src={apartment.ThumbUrl || ""}/>
                                        <Typography variant="subtitle2" noWrap>
                                            {`${apartment.Name}, ${apartment.Location}`}
                                        </Typography>
                                    </Stack>

                                </Typography>
                            </Link>
                            <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                                <Typography variant="subtitle2" noWrap>
                                    {house.Description}
                                </Typography>
                            </Link>

                            <Stack direction="row">
                                <ColorPreview colors={[[
                                    "#00AB55",
                                    "#000000",
                                    "#FFFFFF",
                                    "#FFC0CB",
                                    "#FF4842",
                                    "#1890FF",
                                    "#94D82D",
                                    "#FFC107"
                                ]]}/>
                                <Typography variant="subtitle1">
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        sx={{
                                            color: 'text.disabled',
                                            textDecoration: 'line-through'
                                        }}
                                    >
                                        {house.PriceSale && fCurrency(house.PriceSale)}
                                    </Typography>
                                    &nbsp;
                                    {fCurrency(house.Price)}
                                </Typography>
                            </Stack>
                            <Stack direction="column">
                                <Typography variant="subtitle1">
                                    <ul>
                                        {amenities.map(e => e)}
                                    </ul>
                                </Typography>
                            </Stack>
                            <Stack direction="row">
                                <Button fullWidth size="large" color={'primary'} variant="outlined"
                                        onClick={handleShowAppDialog}>
                                    <Typography variant="subtitle1">
                                        Request Form
                                    </Typography>
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
