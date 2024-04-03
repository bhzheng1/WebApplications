import React from "react";
import type { FC } from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "react-datepicker";
import "./form.css";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, FormikProps } from "formik";

interface FormModel {
    name: string;
    username: string;
    email: string;
    dob: Date;
    password: string;
}

const Form: (props: FormikProps<FormModel>) => JSX.Element = ({
    handleSubmit,
    handleChange,
    handleReset,
    values,
    handleBlur,
    setFieldValue,
    initialValues,
}) => {
    let dateOnChange = (date: Date | null) => {
        setFieldValue("dob", date);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="input your name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <label htmlFor="username">UserName</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="input your user name"
                autoComplete="off"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="input your email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <label htmlFor="dob">Date of Birth</label>
            <DatePicker
                name="dob"
                id="dob"
                placeholderText="date of birth"
                onChange={dateOnChange}
                value={
                    values.dob?.toLocaleDateString() +
                    " " +
                    values.dob?.toLocaleTimeString()
                }
                selected={values.dob}
                onBlur={handleBlur}
                showTimeSelect
                dateFormat="Pp"
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="input your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <button type="submit">submit</button>
            <button
                type="reset"
                onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                }}
            >
                reset
            </button>
        </form>
    );
};

const App: FC = () => {
    const initialValues: FormModel = {
        name: "",
        username: "",
        email: "",
        dob: new Date(),
        password: "",
    };

    return (
        <div>
            <Formik<FormModel>
                initialValues={initialValues}
                onSubmit={(values) => console.log(JSON.stringify(values))}
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
