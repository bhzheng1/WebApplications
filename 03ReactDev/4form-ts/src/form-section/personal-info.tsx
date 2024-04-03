import type { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";

export interface PersonalProps {
    name: string;
    surname: string;
    website: string;
    email: string;
}

export const PersonalInfoSection: FC<{
    formik: Pick<
        ReturnType<typeof useFormik<PersonalProps>>,
        "values" | "touched" | "errors" | "handleBlur" | "handleChange"
    >;
}> = ({ formik }) => {
    const { touched, errors, values, handleBlur, handleChange } = formik;
    return (
        <>
            <Typography gutterBottom variant="subtitle1">
                Personal Information
            </Typography>
            <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="name"
                        label="Full Name"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        error={!!(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="surname"
                        label="Surname"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.surname}
                        error={!!(touched.surname && errors.surname)}
                        helperText={touched.surname && errors.surname}
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="website"
                        label="web site"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.website}
                        error={!!(touched.website && errors.website)}
                        helperText={touched.website && errors.website}
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="email"
                        label="email"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={!!(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        required
                    />
                </Grid>
            </Grid>
        </>
    );
};
