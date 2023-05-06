import {filter} from 'lodash';
import {sentenceCase} from 'change-case';
import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import RegisterUserForm from "../../components/registerUser";
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
import UserTable from "../Users/tb";
import AlertDialog from "../../components/AppDialog/AppDialog";
import {ShowAppDialogContext} from "../../components/contexts/contexts";
import axios from 'axios'
import {instanceOf} from "prop-types";
import RegisterHouseForm from "../../components/registerHouse";

// ----------------------------------------------------------------------


export default function User() {
   const {showAppDialog, showEditDialog, handleShowAppDialog, handleEditDialog, uploadedImage, uploadedThumbUrl} = useContext(ShowAppDialogContext);
   const [defaultObject, setDefaultObject] = useState([]);

    const [editId, setEditId] = useState("");
    const [list, setList] = useState([]);
    const [table_head, setTableHead] = useState([
        {id: 'FirstName', label: 'FirstName', alignRight: false},
        {id: 'LastName', label: 'LastName', alignRight: false},
        {id: 'Email', label: 'Email', alignRight: false},
        {id: 'Password', label: 'Password', alignRight: false},
        {id: 'Role', label: 'Role', alignRight: false},
        {id: 'ApartmentId', label: 'ApartmentId', alignRight: false},
        {id: 'HouseId', label: 'HouseId', alignRight: false},
        {id: 'IsVerified', label: 'IsVerified', alignRight: false},
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
        axios.get("https://rent-app-master.herokuapp.com/api/all-users").then((response) => {
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
        axios.post("https://rent-app-master.herokuapp.com/api/all-users", [form_data]).then((response) => {
            console.log(response.data.info);
            setListUpdate(!listUpdate);
        });
        console.log(form_data);

    };

    const deleteUser = (_id) => {
        if (Array.isArray(_id)) {
            _id.map((item) => {
                axios.post("https://rent-app-master.herokuapp.com/api/all-users/delete", [{"_id": item}]).then((response) => {
                    console.log(response.data.info)
                    setListUpdate(!listUpdate);
                })
            })
        } else {
            axios.post("https://rent-app-master.herokuapp.com/api/all-users/delete", [{_id}]).then((response) => {
                console.log(response.data.info);
                setListUpdate(!listUpdate);
            })
        }
    };

    const handleEditTextInput = () => {
        let el = document.querySelector(".register-user-form");
        console.log(el)
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
        form_data["_id"] = editId;
        axios.post("https://rent-app-master.herokuapp.com/api/all-users/update", form_data).then((response) => {
            console.log(response.data.info);
            setListUpdate(!listUpdate);
        });
        console.log(form_data);

    };

    const editUser = (_id) => {
        handleShowAppDialog(true);
        handleEditDialog(true);
        axios.get(`https://rent-app-master.herokuapp.com/api/all-users?_id=${_id}`).then((response) => {
            console.log(response.data.info);
            setDefaultObject(response.data.info[0]);
            setEditId(_id);
        })

    };

    return (
        <Page title="Users | Rent Management">
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

            {showEditDialog && showAppDialog ? (
                <AlertDialog
                    title={`Edit User`}
                    handleTextInput={handleEditTextInput}
                    component={
                        <RegisterUserForm
                            tableHead={table_head}
                            loading="{isLoadingObject.isDeleting}"
                            deleteFunction="{DeleteVaccine}"
                            defaultObject={defaultObject}
                            name="Patrick"
                            value="Patricode"
                            message="Note that all records associated to this vaccine including batches,vaccination and vaccination requests will also be deleted"
                        />
                    }
                />
            ) : null}

            {showEditDialog && showAppDialog ? (
                <AlertDialog
                    title={`Edit House`}
                    handleTextInput={handleEditTextInput}
                    component={
                        <RegisterUserForm
                            tableHead={table_head}
                            loading="{isLoadingObject.isDeleting}"
                            deleteFunction="{DeleteVaccine}"
                            defaultObject={defaultObject}
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
                        Users
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

                <UserTable list={list} tableHead={table_head} deleteFunction={deleteUser} editFunction={editUser}/>
            </Container>
        </Page>
    );
}
