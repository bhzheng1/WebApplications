import React from "react";
import type { FC } from "react";
import ReactDOM from "react-dom/client";
import { Formik, FormikProps } from "formik";
import "./form.css";
import * as yup from "yup";
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    MenuItem,
    Button,
    createTheme,
    ThemeProvider,
} from "@mui/material";

interface FormModel {
    name: string;
    surname: string;
    website: string;
    email: string;
    course: string;
    password: string;
    confirmPassword: string;
}

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: "red" },
            },
        },
    },
});

const courseCategory = [
    {
        value: "webDevelopment",
        label: "Web Development",
    },
    {
        value: "networking",
        label: "Networking",
    },
    {
        value: "computerScience",
        label: "Computer Science",
    },
];

const validationsForm = yup.object({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    course: yup.string().required("Select your course category"),
    password: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match")
        .required("Confirm your password"),
    website: yup.string().url().required("Website is required"),
});

const Form: (props: FormikProps<FormModel>) => JSX.Element = (props) => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
    } = props;

    return (
        <div className={"container"}>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit}>
                    <Card className={"card"}>
                        <CardContent>
                            <TextField
                                required
                                id="website"
                                label="Website"
                                value={values.website}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                    touched.website ? errors.website : ""
                                }
                                error={
                                    touched.website && Boolean(errors.website)
                                }
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                required
                                id="name"
                                label="First Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.name ? errors.name : ""}
                                error={touched.name && Boolean(errors.name)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                required
                                id="surname"
                                label="Last Name"
                                value={values.surname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                    touched.surname ? errors.surname : ""
                                }
                                error={
                                    touched.surname && Boolean(errors.surname)
                                }
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                required
                                id="email"
                                label="Email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.email ? errors.email : ""}
                                error={touched.email && Boolean(errors.email)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                required
                                select
                                id="course"
                                label="Course Category"
                                value={values.course}
                                onChange={handleChange("course")}
                                helperText={touched.course ? errors.course : ""}
                                error={touched.course && Boolean(errors.course)}
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            >
                                {courseCategory.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                    touched.password ? errors.password : ""
                                }
                                error={
                                    touched.password && Boolean(errors.password)
                                }
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                required
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={
                                    touched.confirmPassword
                                        ? errors.confirmPassword
                                        : ""
                                }
                                error={
                                    touched.confirmPassword &&
                                    Boolean(errors.confirmPassword)
                                }
                                margin="dense"
                                variant="outlined"
                                fullWidth
                            />
                        </CardContent>
                        <CardActions className={"actions"}>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                SUBMIT
                            </Button>
                            <Button color="secondary" onClick={handleReset}>
                                CLEAR
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </ThemeProvider>
        </div>
    );
};

const App: FC = () => {
    const initialValues: FormModel = {
        website: "",
        name: "",
        surname: "",
        email: "",
        course: "",
        password: "",
        confirmPassword: "",
    };
    return (
        <div>
            <Formik<FormModel>
                initialValues={initialValues}
                onSubmit={(values) => console.log(JSON.stringify(values))}
                validationSchema={validationsForm}
                component={Form}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
