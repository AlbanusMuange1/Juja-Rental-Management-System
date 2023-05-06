import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ApartmentId(props) {
    const [cmp, setCmp] = useState([]);
    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/role").then((apId) => {
            setCmp(apId.data.info)
        })
    }, [props]);


    return (
        <>
            {props.dv ? <>
                    <option>Select {"Role"}</option>
                    {cmp.map((val) => {
                        if (val.Name === props.dv.Name) {
                            return <option selected value={val.Name}>{val.Name}</option>;
                        } else {
                            return <option value={val.Name}>{val.Name}</option>;
                        }
                    })}
                </> :

                <>
                    <option selected>Select {"Role"}</option>
                    {cmp.map((val) => {
                        return <option value={val.Name}>{val.Name}</option>;
                    })}
                </>
                }

            </>)
            }