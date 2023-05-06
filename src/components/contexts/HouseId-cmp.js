import React, {useEffect, useState} from "react";
import axios from "axios";

export default function HouseId(props) {
    const [cmp, setCmp] = useState([]);
    useEffect(() => {
        console.log(props.dv)
        axios.get("https://rent-app-master.herokuapp.com/api/houses").then((apId) => {
            setCmp(apId.data.info)
        })
    }, [props]);


    return (
        <>
             {props.dv ? <>
                    <option>Select {"HouseId"}</option>
                    {cmp.map((val) => {
                        if (val.Id === props.dv.Id) {
                            return <option selected value={val.Id}>{val.Id + " -- " + val.Type}</option>;
                        } else {
                            return <option value={val.Id}>{val.Id + " -- " + val.Type}</option>;
                        }
                    })}
                </> :

                <>
                    <option selected>Select {"HouseId"}</option>
                    {cmp.map((val) => {
                        return <option value={val.Id}>{val.Id + " -- " + val.Type}</option>;
                    })}
                </>
                }
        </>
    )
}