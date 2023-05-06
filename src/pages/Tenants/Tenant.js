import {filter} from 'lodash';
import {sentenceCase} from 'change-case';
import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import RegisterHouseForm from "../../components/registerHouse";
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../../sections/@dashboard/user';
//
import USERLIST from '../../_mocks_/user';
import HouseTable from "../Houses/tb";
import AlertDialog from "../../components/AppDialog/AppDialog";
import {ShowAppDialogContext} from "../../components/contexts/contexts";
import axios from 'axios'
import {instanceOf} from "prop-types";

// ----------------------------------------------------------------------


export default function Tenant() {
    const {showAppDialog, showEditDialog, handleShowAppDialog, uploadedImage, uploadedThumbUrl} = useContext(ShowAppDialogContext);

    const [list, setList] = useState([]);
    const [table_head, setTableHead] = useState([
        {id: 'Id', label: 'Id', alignRight: false},
        {id: 'Type', label: 'Type', alignRight: false},
        {id: 'ApartmentId', label: 'ApartmentId', alignRight: false},
        {id: 'Status', label: 'Status', alignRight: false},
        {id: 'Image', label: 'Image', alignRight: false},
    ]);

    const [listUpdate, setListUpdate] = useState(false);

    const handleAddUser = () => {
        console.log("click");
        handleShowAppDialog();
    };


    const setUser = () => {

    };

    useEffect(() => {
        setListUpdate(!listUpdate);
    }, []);

    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/houses/").then((response) => {
            console.log(response.data.info)
            setList(response.data.info);
        })
    }, [listUpdate]);

    const handleTextInput = () => {
        let el = document.querySelector(".register-user-form");
        let form_data = {};
        el.querySelectorAll(".master").forEach((div) => {
            let field = div.querySelector("label").innerText.split("*")[0].trim();
            if (field === "Image") {
                form_data[field] = uploadedImage;
                form_data["ThumbUrl"] = uploadedThumbUrl;

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
        console.log(form_data);

    };


    const deleteHouse = (_id) => {
        if (Array.isArray(_id)) {
            _id.map((item) => {
                axios.post("https://rent-app-master.herokuapp.com/api/houses/delete", [{"_id": item}]).then((response) => {
                    console.log(response.data.info)
                    setListUpdate(!listUpdate);
                })
            })
        } else {
            axios.post("https://rent-app-master.herokuapp.com/api/houses/delete", [{_id}]).then((response) => {
                console.log(response.data.info);
                setListUpdate(!listUpdate);
            })
        }
    };

    return (
        <Page title="House | Rent Management">
            {showAppDialog && !showEditDialog ? (
                <AlertDialog
                    title={`Add House`}
                    handleTextInput={handleTextInput}
                    component={
                        <RegisterHouseForm
                            tableHead={table_head}
                            loading="{isLoadingObject.isDeleting}"
                            deleteFunction="{DeleteVaccine}"
                            name="Patrick"
                            value="Patricode"
                            message="Note that all records associated to this vaccine including batches,vaccination and vaccination requests will also be deleted"
                        />
                    }
                />
            ) : null}
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Houses
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={handleAddUser}
                    >
                        New House
                    </Button>
                </Stack>

                <HouseTable list={list} tableHead={table_head} deleteFunction={deleteHouse}/>
            </Container>
        </Page>
    );
}
