import type { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Typography from "@mui/material/Typography";

export interface AddressProps {
    address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
    };
}

export const AddressInfoSection: FC<{
    formik: Pick<
        ReturnType<typeof useFormik<AddressProps>>,
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
                        name="address.address1"
                        label="Address1"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address.address1}
                        error={
                            !!(
                                touched.address?.address1 &&
                                errors.address?.address1
                            )
                        }
                        helperText={
                            touched.address?.address1 &&
                            errors.address?.address1
                        }
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="address.address2"
                        label="Address2"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address.address2}
                        error={
                            !!(
                                touched.address?.address2 &&
                                errors.address?.address2
                            )
                        }
                        helperText={
                            touched.address?.address2 &&
                            errors.address?.address2
                        }
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="address.city"
                        label="City"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address.city}
                        error={
                            !!(touched.address?.city && errors.address?.city)
                        }
                        helperText={
                            touched.address?.city && errors.address?.city
                        }
                    />
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        name="address.state"
                        label="state"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address.state}
                        error={
                            !!(touched.address?.state && errors.address?.state)
                        }
                        helperText={
                            touched.address?.state && errors.address?.state
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
};
