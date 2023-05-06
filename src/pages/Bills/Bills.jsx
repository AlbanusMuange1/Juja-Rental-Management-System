import {filter} from 'lodash';
import {sentenceCase} from 'change-case';
import React, {useContext, useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import RegisterBillForm from "../../components/registerBill";
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
// import USERLIST from '../../_mocks_/bill';
import AlertDialog from "../../components/AppDialog/AppDialog";
import {ShowAppDialogContext} from "../../components/contexts/contexts";
import axios from 'axios'
import {instanceOf} from "prop-types";
import BillsTable from "./tb";

// ----------------------------------------------------------------------


export default function Bills() {
    const {showAppDialog, showEditDialog, handleShowAppDialog, handleEditDialog, uploadedImage, uploadedThumbUrl} = useContext(ShowAppDialogContext);

    const [list, setList] = useState([]);
    const [defaultObject, setDefaultObject] = useState([]);
    const [table_head, setTableHead] = useState([
        {id: 'Id', label: 'Id', alignRight: false},
        {id: 'Name', label: 'Name', alignRight: false},
        {id: 'Amount', label: 'Amount', alignRight: false},
        {id: 'Date', label: 'Date', alignRight: false},
        {id: 'Time', label: 'Time', alignRight: false},
        {id: 'ApartmentId', label: 'ApartmentId', alignRight: false},
        {id: 'HouseId', label: 'HouseId', alignRight: false},
        {id: 'IsVerified', label: 'IsVerified', alignRight: false},
        {id: 'Status', label: 'Status', alignRight: false},
        {id: 'Image', label: 'Image', alignRight: false},

    ]);

    const [listUpdate, setListUpdate] = useState(false);

    const handleAddBill = () => {
        console.log("click");
        handleShowAppDialog();
    };


    const setBill = () => {

    };

    useEffect(() => {
        setListUpdate(!listUpdate);
    }, []);

    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/bills").then((response) => {
            console.log(response.data.info)
            setList(response.data.info);
        })
    }, [listUpdate]);

    const handleTextInput = () => {
        let el = document.querySelector(".register-bill-form");
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
        axios.post("https://rent-app-master.herokuapp.com/api/bills", [form_data]).then((response) => {
            console.log(response.data.info);
            setListUpdate(!listUpdate);
        });
        console.log(form_data);

    };

    const handleEditTextInput = () => {
        let el = document.querySelector(".register-bill-form");
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
        axios.post("https://rent-app-master.herokuapp.com/api/bills/update", [form_data]).then((response) => {
            console.log(response.data.info);
            setListUpdate(!listUpdate);
        });
        console.log(form_data);

    };


    const deleteBill = (_id) => {
        if (Array.isArray(_id)) {
            _id.map((item) => {
                axios.post("https://rent-app-master.herokuapp.com/api/bills/delete", [{"_id": item}]).then((response) => {
                    console.log(response.data.info)
                    setListUpdate(!listUpdate);
                })
            })
        } else {
            axios.post("https://rent-app-master.herokuapp.com/api/bills/delete", [{_id}]).then((response) => {
                console.log(response.data.info);
                setListUpdate(!listUpdate);
            })
        }
    };

    const editBill = (_id) => {
        handleShowAppDialog(true);
        handleEditDialog(true);

        axios.get(`https://rent-app-master.herokuapp.com/api/bills?_id=${_id}`).then((response) => {
            console.log(response.data.info);
            setDefaultObject(response.data.info[0]);
        })

    };

    return (
        <Page title="Bills | Rent Management">
            {showAppDialog && !showEditDialog ? (
                <AlertDialog
                    title={`Add Bill`}
                    handleTextInput={handleTextInput}
                    component={
                        <RegisterBillForm
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
                    title={`Edit Bill`}
                    handleTextInput={handleEditTextInput}
                    component={
                        <RegisterBillForm
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
                        Bills
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Iconify icon="eva:plus-fill"/>}
                        onClick={handleAddBill}
                    >
                        New Bill
                    </Button>
                </Stack>

                <BillsTable list={list} tableHead={table_head} deleteFunction={deleteBill} editFunction={editBill}/>
            </Container>
        </Page>
    );
}
