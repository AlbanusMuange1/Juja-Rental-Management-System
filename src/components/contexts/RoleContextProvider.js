import React, { useState } from 'react';
import { RoleContext } from './contexts';
import { ShowAppDialogContext } from './contexts';

export function RoleContextProvider(props) {
    const [role, setRole] = useState('Tenant');
    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {props.children}
        </RoleContext.Provider>
    );
}

export function ShowAppDialogContextProvider(props) {
    const [showAppDialog, setShowAppDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [uploadedImage, setUploadedImage] = useState("");
    const [uploadedThumbUrl, setUploadedThumbUrl] = useState("");

    const handleShowAppDialog = (value) => {
        if (value === undefined) {
            setShowAppDialog(!showAppDialog);
            setShowEditDialog(false)
        } else {
            setShowAppDialog(value);
            setShowEditDialog(false)
        }
    };
    const handleEditDialog = (value) => {
        if (value === undefined) {
            setShowEditDialog(!showEditDialog)
        } else {
            setShowEditDialog(value);
        }
    };
    return (
        <ShowAppDialogContext.Provider value={{ showAppDialog, handleShowAppDialog, showEditDialog, handleEditDialog, uploadedImage, setUploadedImage, uploadedThumbUrl, setUploadedThumbUrl }}>
            {props.children}
        </ShowAppDialogContext.Provider>
    );
}

