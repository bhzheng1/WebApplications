"use client";

import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import "./page.css";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
}

const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
};

const handleSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
};

const validationSchema = yup.object({
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
});

export default function SignUpForm() {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="main">
            <h1>login form</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div className="error">{formik.errors.firstName}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div className="error">{formik.errors.lastName}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="error">{formik.errors.email}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="button"
                    disabled={formik.isSubmitting}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
