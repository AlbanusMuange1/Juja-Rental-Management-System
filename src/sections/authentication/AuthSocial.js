import React, {useContext, useEffect, useState} from 'react';
import {getRole, getToken} from "./../../utils/common";

// material
import { Stack, Button, Divider, Typography,  Tabs, Tab } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import {RoleContext} from "../../components/contexts/contexts";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const {role, setRole} = useContext(RoleContext);
  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);


  const handleFirstClick = (e, num)=>{
    setFlag2(true);
    setFlag3(true);
    setFlag1(false);
    setRole(num)
  };

  const handleSecondClick = (e, num)=>{
    setFlag1(true);
    setFlag3(true);
    setFlag2(false);
    setRole(num)
  };

  useEffect(()=>{
    setFlag1(false);
    setRole("Tenant");

  }, []);

  const handleThirdClick = (e, num)=>{
    setFlag1(true);
    setFlag2(true);
    setFlag3(false);
    setRole(num)
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color={flag1 ? 'primary' : 'secondary'} variant="outlined" onClick = {(e)=>handleFirstClick(e, "Tenant")}>
          <Iconify icon="akar-icons:person" color={flag3 ? 'primary' : 'secondary'} height={24} />
          Tenant
        </Button>
        {getRole() === "SuperAdmin" ?
            <>
            <Button fullWidth size="large" color={flag2 ? 'primary' : 'secondary'} variant="outlined"
                    onClick={(e) => handleSecondClick(e, "Landlord")}>
              <Iconify icon="bi:person-bounding-box" color={flag3 ? 'primary' : 'secondary'} height={24}/>
              Landlord
            </Button>

            < Button fullWidth size="large" color={flag3 ? 'primary' : 'secondary'} variant="outlined" onClick={(e) => handleThirdClick(e, "Super Admin")}>
          <Iconify icon="bi:person-check-fill" color={flag3 ? 'primary' : 'secondary'} height={24} />
          Admin
          </Button></>:null
        }
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          --
        </Typography>
      </Divider>
    </>
  );
}
