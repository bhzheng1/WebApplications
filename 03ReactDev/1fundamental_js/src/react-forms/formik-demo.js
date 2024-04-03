import React from "react";
import { Formik } from "formik";
import ReactDom from "react-dom/client";
const initiallValues = {
    name: "",
    email: "",
    password: "",
    comments: "",
};

const Basic = () => (
    <div>
        <h1>form in app</h1>

        <Formik
            initialValues={initiallValues}
            validate={(values) => {
                const errors = {};
                if (!values.email) {
                    errors.email = "Required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                    )
                ) {
                    errors.email = "Invalid email address";
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {
                //the child of formik is a function component.
            }
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* nd other goodies */
            }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder={"name"}
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <input
                        type="text"
                        name="comments"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comments}
                    />
                    {errors.password && touched.password && errors.password}

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
);

const App = () => {
    return (
        <div>
            <Basic />
        </div>
    );
};
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
