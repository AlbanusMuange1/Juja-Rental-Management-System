import React, {useState} from "react";

export default function Amenities() {
    let index = 1;

    function clicked (e){
        console.log("clicked")
        document.getElementById("test").innerHTML+=(`<div class='singleAmenity'>
                    <div>
                <input class='amenity-item' type='checkbox'/>
                <input class='amenity-item' type='text'/>
                </div>
            </div>`);
        index+=1;
    }
    document.querySelectorAll(".add_amenity").forEach((el)=>{
        el.onclick = (e)=>{
            e.target.parentElement.innerHTML+=(`<div class='singleAmenity'>
                    <div>
                <input class='amenity-item' type='checkbox'/>
                <input class='amenity-item' type='text'/>
                </div>
            </div>`);
        }
    });
    const [cmp, setCmp] = useState([<div>
                <input className={'amenity-item'} type={'checkbox'}/>
                <input className={'amenity-item'} type={'text'}/>
                <button className="add_amenity">Add Ammenity</button>
                </div>]);



    return (
        <div id={"test"}>

            <div className={'singleAmenity'} key={index}>
                    <div>
                <input className={'amenity-item'} type={'checkbox'}/>
                <input className={'amenity-item'} type={'text'}/>

                </div>
            </div>
        </div>
    )
}