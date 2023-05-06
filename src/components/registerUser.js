import React, {useEffect, useState} from "react";
import Methods from "../utils/utilities";


export default function RegisterUserForm(props) {

  const [editing, setEditing] = useState(false);
  const [fieldList, setFieldList] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
     setFieldList(props.tableHead);
      console.log(props.defaultObject);
     setElements(Methods.getFields(props.tableHead, props.defaultObject))
  }, [props]);

  return (
    <div className="register-user-form">
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
      <span className="text-muted">
        <i class="fas fa-user-edit"></i> Submitting product batch as{" "}
        {/*{userData.user_name}*/}
      </span>
      <br></br>
      <br></br>
      <button
        // disabled={isLoadingObject.registerProduct}
        /*onClick={() =>
         !isEditing? registerVaccine(() =>
            props.history.push(
              userData.user_role === MANUFACTURER_ROLE
                ? MANUFACTURER
                : VACCINES_ROUTE
            )
          ):
          upDateVaccine(()=>{
            handleShowAppDialog();
          })
        }*/
        className="btn btn-primary btn-lg"
      >
        {/*{isLoadingObject.registerProduct ? (
          <>
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>{" "}
            Please wait ...
          </>
        ) : (
          <>
            <i class="fas fa-check-circle"></i>{" "}
            {isEditing ? "Update" : "Register"}
          </>
        )}*/}
      </button>
    </div>
  );
}