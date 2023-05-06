import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ApartmentId(props) {
    const [cmp, setCmp] = useState([]);
    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/apartment").then((apId) => {
            setCmp(apId.data.info)
        })
    }, [props]);


    return (
        <>
            {props.dv ? <>
                    <option>Select {"ApartmentId"}</option>
                    {cmp.map((val) => {
                        if (val.Id === props.dv.Id) {
                            return <option selected value={val.Id}>{val.Id + " -- " + val.Name}</option>;
                        } else {
                            return <option value={val.Id}>{val.Id + " -- " + val.Name}</option>;
                        }
                    })}
                </> :

                <>
                    <option selected>Select {"ApartmentId"}</option>
                    {cmp.map((val) => {
                        return <option value={val.Id}>{val.Id + " -- " + val.Name}</option>;
                    })}
                </>
                }

            </>)
            }