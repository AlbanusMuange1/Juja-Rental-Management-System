import PropTypes from 'prop-types';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
// material
import {Box, Card, Link, Typography, Stack, Avatar, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
// utils
import {fCurrency} from '../../../utils/formatNumber';
//
import Label from '../../../components/Label';
import ColorPreview from '../../../components/ColorPreview';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getToken} from "../../../utils/common";

// ----------------------------------------------------------------------

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

ShopProductCard.propTypes = {
    product: PropTypes.object
};

export default function ShopProductCard({product}) {
    const navigate = useNavigate();
    // const { Name, Image, price, colors, status, priceSale } = product;
    const {Id, Type, ApartmentId, Description, Price, PriceSale, Status, Image} = product;

    const [apartment, setApartment] = useState([]);

    useEffect(() => {
        axios.get(`https://rent-app-master.herokuapp.com/api/apartment?Id=${ApartmentId}`)
            .then((response) => {
                setApartment(response.data.info[0])
            })
    }, []);

    const houseClick = (e) => {
        getToken() ? navigate(`/listings/${Type}/${Id}`) : navigate(`/register`);
        console.log(product, apartment);
    };
    return (
        <Card>
            <Box sx={{pt: '100%', position: 'relative', overflow: 'hidden'}}>
                {Status && (
                    <Label
                        variant="filled"
                        color={(Status === 'Inactive' && 'error') || 'info'}
                        sx={{
                            zIndex: 9,
                            top: 16,
                            right: 16,
                            position: 'absolute',
                            textTransform: 'uppercase'
                        }}
                    >
                        {Status}
                    </Label>
                )}
                <ProductImgStyle onClick={houseClick} alt={Type} src={Image}/>
            </Box>

            <Stack spacing={1} sx={{p: 1}}>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {Type}
                    </Typography>
                </Link>

                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {apartment ?
                                <>
                                <Avatar alt={Type} src={apartment.ThumbUrl || ""}/>
                                <Typography variant="subtitle2" noWrap>
                                    {`${apartment.Name}, ${apartment.Location}`}
                                </Typography>
                                </>:null
                            }

                        </Stack>
                    </Typography>
                </Link>
                <Link to="#" color="inherit" underline="hover" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {Description}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
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
                            {PriceSale && fCurrency(PriceSale)}
                        </Typography>
                        &nbsp;
                        {fCurrency(Price)}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
);
}
