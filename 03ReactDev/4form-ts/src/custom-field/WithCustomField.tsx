import { Formik, Form, Field } from "formik";
import TrafficLight from "./TrafficLight";
import type { FC } from "react";
import * as Yup from "yup";

type FormModel = {
    firstName: string;
    lastName: string;
    trafficLight: number;
};

const initialValues: FormModel = {
    firstName: "Rajesh",
    lastName: "Naroth",
    trafficLight: 0,
};

const nameSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
});

const handleSubmit = (values: FormModel) => {
    console.log(values);
};

const FormWithCustomField: FC = ({ errors, touched, handleSubmit }: any) => (
    <Form>
        <label>
            First Name:
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
            ) : null}
        </label>
        <label>
            Last Name:
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
            ) : null}
        </label>
        <Field name="trafficLight" component={TrafficLight} />
        <input type="submit" value="Submit" onSubmit={handleSubmit} />
    </Form>
);

const ReactFormikForm: FC = () => (
    <div>
        <h3>Formik Form with validation</h3>
        <Formik
            initialValues={initialValues}
            validationSchema={nameSchema}
            onSubmit={handleSubmit}
        >
            {FormWithCustomField}
        </Formik>
    </div>
);

export default ReactFormikForm;
