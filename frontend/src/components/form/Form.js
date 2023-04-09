import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/authSlice';
import { Stack, Typography, TextField, Button, Link, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { Formik, Form } from "formik";
import { loginSchema, signupSchema } from "./validate";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const initialSignupValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const initialLoginValues = {
    email: "",
    password: ""
}

function AuthForm({ formType }) {
    const isLogin = formType === "login";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const login = async (values, onSubmitProps)=> {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/login", values);
            const user = response.data;

            //redux
            if (user) {
                dispatch(
                    setLogin({
                        user: user.user,
                        token: user.token
                    })
                );
                navigate("/");
            };
            onSubmitProps.resetForm();
        } catch (err) {
            console.log(err)
        };
    };

    const signup = async (values, onSubmitProps)=> {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/login", values);
            const user = response.data;

            //redux
            if (user) {
                dispatch(
                    setLogin({
                        user: user.user,
                        token: user.token
                    })
                );
                navigate("/");
            };
            onSubmitProps.resetForm();
        } catch (err) {
            console.log(err)
        };
    };

    const handleFormSubmit = async(values, onSubmitProps)=> {
        setIsFormSubmitting(true);
        if (isLogin) await login(values, onSubmitProps);
        if (!isLogin) await signup(values, onSubmitProps)
    };

    return (
        <Formik
            initialValues = {isLogin ? initialLoginValues : initialSignupValues}
            validationSchema = {isLogin ? loginSchema : signupSchema}
            onSubmit = {handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit
            })=> (
                <Form onSubmit={handleSubmit}>
                    <Stack
                        spacing={3}
                        m={2}
                        width="500px"
                    >
                    {!isLogin && (
                        <TextField
                            size="small"
                            label="Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            type="text"
                            error={Boolean(touched.name) && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            sx={{gridColumn: "span 4"}}
                        />
                    )}
                    <TextField
                        size="small"
                        label="Email Address"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        type="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        size="small"
                        label="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                    {!isLogin && (
                        <TextField
                            size="small"
                            label="Confirm Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                    )}
                    <Stack alignItems="flex-end">
                        <Link
                            sx={{ textDecoration: "none", p: "1px", fontSize: "20px", "&:hover": { border: "1px solid blue" } }}
                            href="#" underline="none"
                        >
                        Forget Password?
                        </Link>
                    </Stack>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isFormSubmitting}
                    >
                        {isFormSubmitting ? (<CircularProgress size={20} color="inherit" />) :
                        (isLogin ? "Sign In" : "Register")
                        }
                    </Button>
                    <Typography
                            onClick={()=> {
                                isLogin ? navigate("/signup") : navigate("/login")
                            }}
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                }
                            }}
                        >
                            {isLogin ?
                            "Don't have an account? Sign Up Here." :
                            "Already have an account? Login Here."}
                    </Typography>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default AuthForm;

