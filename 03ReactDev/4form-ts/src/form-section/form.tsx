import { createRoot } from "react-dom/client";
import type { FC } from "react";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { PersonalProps, PersonalInfoSection } from "./personal-info";
import { AddressProps, AddressInfoSection } from "./address-info";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

interface FromProps {
    [key: string]: any;
}

interface FormModel extends PersonalProps, AddressProps {}

const initialValues: FormModel = {
    name: "",
    surname: "",
    website: "",
    email: "",
    address: {
        address1: "",
        address2: "",
        city: "",
        state: "",
    },
};

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.object({
        address1: Yup.string().required("Address is required"),
    }),
});

const Form: FC<FromProps> = (props) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <Stack divider={<Divider />} spacing={3} sx={{ mt: 3 }}>
                <PersonalInfoSection formik={formik} />
                <AddressInfoSection formik={formik} />
            </Stack>
            <Button
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
            >
                Submit
            </Button>
        </form>
    );
};

const App: FC = () => (
    <>
        <Form />
    </>
);

const domNode = document.getElementById("root") as HTMLElement;
const root = createRoot(domNode);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
