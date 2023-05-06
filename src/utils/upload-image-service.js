import http from "./http-common";
import React from "react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'

class UploadService {
    upload(file, onSuccess, onError) {
        let formData = new FormData();

        formData.append("file", file);

        return (<IKContext
            publicKey="public_ORd+K5aX8s27TkeubRrTJoLkEPE="
            privateKey="private_Nd9yIzksVJ0vObbL5xMzlAX/A5w="
            urlEndpoint="https://ik.imagekit.io/patricode"
            transformationPosition="path"
            >


            {console.log(file)}
            // Image component
            <IKImage path={`C:\\Users\\PATRICK K\\OneDrive\\projects\\Data\\K-images\\images\\ajab wheat flour.jpg`} transformation={[{
                "height": "300",
                "width": "400"
            }]}/>

            // Image upload
            <IKUpload fileName={`C:\\Users\\PATRICK K\\OneDrive\\projects\\Data\\K-images\\images\\ajab wheat flour.jpg`} onSuccess={onSuccess} onError={onError}/>
        </IKContext>)


        /*return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });*/
    }

    getFiles() {
        return http.get("/files");
    }
}

export default new UploadService();