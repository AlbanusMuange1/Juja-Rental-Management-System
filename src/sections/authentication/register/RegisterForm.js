import * as Yup from 'yup';
import {useContext, useState} from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import {RoleContext} from "../../../components/contexts/contexts";

import axios from 'axios'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {role, setRole} = useContext(RoleContext);

  const RegisterSchema = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    LastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    Email: Yup.string().email('Email must be a valid Email address').required('Email is required'),
    Password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      let v = values;
      v.Role = role||"Tenant";
      v.IsVerified = "true";
      v.Status = "true";
      v.Image = "";
      v.ThumbUrl = "";
      console.log(v);
      axios.post("https://rent-app-master.herokuapp.com/api/all-users", [v]).then((response)=>{
        console.log(response);
        navigate('/login', { replace: true });
      });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('FirstName')}
              error={Boolean(touched.FirstName && errors.FirstName)}
              helperText={touched.FirstName && errors.FirstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('LastName')}
              error={Boolean(touched.LastName && errors.LastName)}
              helperText={touched.LastName && errors.LastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('Email')}
            error={Boolean(touched.Email && errors.Email)}
            helperText={touched.Email && errors.Email}
          />

          <TextField
            fullWidth
            autoComplete="current-Password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('Password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.Password && errors.Password)}
            helperText={touched.Password && errors.Password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
