import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "store/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";

import Alert from '@mui/material/Alert';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Api
import AuthApi from "apis/Auth";

// Authentication layout components
import CoverLayout from "../components/CoverLayout";

// Images
import curved9 from "../../../assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatchToken = (data) => dispatch(authLogin({ ...data }));
  const [alert, setAlert] = useState({ show: false, severity: "info", message: "" });

  const formSubmitHandler = (values, { setSubmitting }) => {
    AuthApi.signIn(values)
      .then(({ data }) => {
        const token = data?.data?.token;
        dispatchToken({ token });
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => setAlert({ show: true, severity: "error", message: err?.response?.data?.message ?? "Something went wrong" }))
      .finally(() => setSubmitting(false));
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email isn't valid!").required("Email is required!"),
      password: yup.string().required("Password is required!"),
    }),
    onSubmit: formSubmitHandler,
  });

  const { values, errors, touched, handleChange, isSubmitting, handleSubmit } = formik;

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      {alert.show && (
        <Alert
          severity={alert.severity}
          onClose={() => setAlert(prev => ({ ...prev, show: false }))}>
          {alert.message}
        </Alert>
      )}

      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            error={Boolean(errors.email && touched.email)}
            errorMessage={errors?.email ?? ""}
          />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            error={Boolean(errors.password && touched.password)}
            errorMessage={errors?.password ?? ""}
          />
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton
            fullWidth
            variant="gradient"
            color="info"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Loading..." : "Sign In"}
          </SuiButton>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
