import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Status(props) {
    const [cmp, setCmp] = useState([]);
    useEffect(() => {
        axios.get("https://rent-app-master.herokuapp.com/api/status").then((roles) => {
            setCmp(roles.data.info)
        })
    }, [props]);


    return (
        <>
            {props.dv ? <>
                    <option>Select {"Status"}</option>
                    {cmp.map((val) => {
                        if (val.Name === props.dv.Id) {
                            return <option selected value={val.Name}>{val.Name}</option>;
                        } else {
                            return <option value={val.Name}>{val.Name }</option>;
                        }
                    })}
                </> :

                <>
                    <option selected>Select {"Status"}</option>
                    {cmp.map((val) => {
                        return <option value={val.Name}>{val.Name }</option>;
                    })}
                </>
            }
        </>
    )
}