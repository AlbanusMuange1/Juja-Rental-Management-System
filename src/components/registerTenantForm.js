import React, {useEffect, useState} from "react";
import Methods from "../utils/utilities";


export default function RegisterTenantForm(props) {
  const [editing, setEditing] = useState(false);
  const [fieldList, setFieldList] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
     setFieldList(props.tableHead);
     setElements(Methods.getFields(props.tableHead))
  }, []);

  return (
    <div className="register-tenant-form">
        {elements.map(el=>el)}

        {/*{(
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Specify Manufacturer *
          </label>

          <select
            defaultValue="{webUserSelected}"
            // onChange={(e) => handleWebUserChange(e.target.value)}
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Select Manufacturer</option>
            {webUsers
              .filter((val1) => {
                return val1.role === MANUFACTURER_ROLE;
              })
              .map((val) => {
                return <option value={val.id}>{val.name}</option>;
              })}
          </select>
        </div>
      )}

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Vaccine Name *
        </label>
        <input
          // defaultValue={isEditing?defaultVaccineObject.name:vaccineName}
          // onChange={(e) => SetVaccineName(e.target.value)}
          type="text"
          class="form-control"
          id=""
          placeholder="Enter name of the vaccine"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Specify Vaccine Type *
        </label>

        <select
          // value={vaccineType}
          // onChange={(e) => handleVaccineTypeChange(e.target.value)}
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Vaccine Type</option>
          {vaccine_type
            ? vaccine_type.map((val) => {
                return <option value={val.id}>{val.name}</option>;
              })
            : null}
        </select>
      </div>
*/}

    </div>
  );
}