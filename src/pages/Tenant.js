import {filter} from 'lodash';
import {sentenceCase} from 'change-case';
import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import RegisterUserForm from "../components/registerUser";
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
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead, UserListToolbar, UserMoreMenu} from '../sections/@dashboard/user';
//
import USERLIST from '../_mocks_/user';
import MasterTb from "./Users/tb";
import AlertDialog from "../components/AppDialog/AppDialog";
import {ShowAppDialogContext} from "../components/contexts/contexts";
import axios from 'axios'

// ----------------------------------------------------------------------


export default function Tenant() {
    const {showAppDialog, showEditDialog, handleShowAppDialog, uploadedImage, uploadedThumbUrl} = useContext(ShowAppDialogContext);

    const [list, setList] = useState([]);
    const [table_head, setTableHead] = useState([
        {id: 'Name', label: 'Name', alignRight: false},
        {id: 'Id', label: 'Id', alignRight: false},
        {id: 'Location', label: 'Location', alignRight: false},
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

    useEffect(()=>{
        setListUpdate(!listUpdate);
    }, []);

    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/apartment").then((response) => {
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
        axios.post("https://rent-app-master.herokuapp.com/api/apartment", [form_data]).then((response) => {
            console.log(response.data.info);
            setListUpdate(!listUpdate);
        });
        console.log(form_data);

    };


    const deleteApartment = (_id) => {
        axios.post("https://rent-app-master.herokuapp.com/api/apartment/delete", [{_id}]).then((response) => {
            console.log(response.data.info)
            setListUpdate(!listUpdate);
        })
    };

    return (
        <Page title="User | Rent Management">
            {showAppDialog && !showEditDialog ? (
                <AlertDialog
                    title={`Add User`}
                    handleTextInput={handleTextInput}
                    component={
                        <RegisterUserForm
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
                        User
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={handleAddUser}
                    >
                        New User
                    </Button>
                </Stack>

                <MasterTb list={list} tableHead={table_head} deleteFunction={deleteApartment}/>
            </Container>
        </Page>
    );
}
