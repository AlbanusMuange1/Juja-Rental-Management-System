import React, {Component, useContext, useEffect, useState} from "react";
import UploadService from "../utils/upload-image-service";
import {IKContext, IKImage, IKUpload} from "imagekitio-react";
import {ShowAppDialogContext} from "./contexts/contexts";

export default function UploadImage (props) {

  const {uploadedImage, setUploadedImage, setUploadedThumbUrl} = useContext(ShowAppDialogContext);

    useEffect(()=>{
        console.log(props.dv);
        setUploadedThumbUrl(props.dv.ThumbUrl);
        setUploadedImage(props.dv.Image);
    }, [props.dv]);

    return (
        <IKContext
            publicKey="public_ORd+K5aX8s27TkeubRrTJoLkEPE="
            urlEndpoint="https://ik.imagekit.io/patricode"
            authenticationEndpoint="https://rent-app-master.herokuapp.com/auth"
        >
            <IKImage
                className={'lazyload-lqip'}
                transformation={[{
                    "height": "200",
                    "width": "200"
                }]}
                loading="lazy"
                lqip={{active: true, quality: 20, blur: 30}}
            />

            <IKUpload
                fileName="test.jpg"
                tags={["sample-tag1", "sample-tag2"]}
                customCoordinates={"10,10,10,10"}
                isPrivateFile={false}
                useUniqueFileName={true}
                responseFields={["tags"]}
                folder={"/sample-folder"}
                onError={(err) => {
                    console.log(err)
                }}
                onSuccess={(s) => {
                    setUploadedImage(s.url);
                    setUploadedThumbUrl(s.thumbnailUrl)
                }}
            />

            <IKImage urlEndpoint={"https://ik.imagekit.io/patricode"} src={uploadedImage}/>

        </IKContext>
    )
}