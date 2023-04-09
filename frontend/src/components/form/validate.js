import * as yup from "yup";

export const signupSchema = yup.object().shape({
    name: yup.string()
        .required("Please enter your full name."),
    email: yup.string()
        .email("Please enter a valid email.")
        .required("Please enter a valid email."),
    password: yup.string()
        .min(8, "Password must be 8 character long.")
        .required("Please enter a password"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Password must match.")
        .required("required")
});

export const loginSchema = yup.object().shape({
    email: yup.string()
        .email("Please enter a valid email.")
        .required("Please enter a valid email."),
    password: yup.string()
        .min(8, "Password must be 8 character long.")
        .required("Please enter a password")
});

