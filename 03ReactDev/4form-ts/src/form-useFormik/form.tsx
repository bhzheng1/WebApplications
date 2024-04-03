import React from "react";
import type { FC } from "react";
import ReactDOM from "react-dom/client";
import { useFormik } from "formik";
import { InputAdornment, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
type FormModel = {
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    file: File | undefined;
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    file: Yup.mixed().required("Required"),
});

const initialValues: FormModel = {
    firstName: "",
    lastName: "",
    email: "",
    salary: 0,
    file: undefined,
};
const Form: () => JSX.Element = () => {
    const formik = useFormik<FormModel>({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log(values.file?.name);
            console.log(values.file?.size);

            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: validationSchema,
    });
    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <TextField
                required
                id="firstName"
                label="firstName"
                name="firstName"
                type="text"
                error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
            />
            <TextField
                required
                id="lastName"
                label="lastName"
                name="lastName"
                type="text"
                error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
            />
            <TextField
                required
                id="email"
                label="email"
                name="email"
                type="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
                value={formik.values.email}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
                onBlur={formik.handleBlur}
            />
            <TextField
                id="salary"
                label="salary"
                name="salary"
                type="number"
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
                onChange={formik.handleChange}
                value={formik.values.salary}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                    ),
                }}
                onBlur={formik.handleBlur}
            />

            <TextField
                id="file"
                label="upload file"
                name="file"
                type="file"
                error={formik.touched.file && Boolean(formik.errors.file)}
                helperText={formik.touched.file && formik.errors.file}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    if (e.target.files) {
                        formik.setFieldValue("file", e.target.files[0], false);
                    }
                }}
                value={undefined}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                    ),
                }}
                required
                onBlur={formik.handleBlur}
            />

            <Button
                variant="outlined"
                onClick={(e) => {
                    formik.setFieldTouched("file");
                }}
            >
                set file touched
            </Button>
            {formik.errors.file && formik.touched.file ? "error" : "no error"}
            <pre>{JSON.stringify(formik.errors)}</pre>
            <button type="submit">Submit</button>
        </form>
    );
};

const App: FC = () => {
    return <Form />;
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
