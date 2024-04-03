import type { FC } from "react";
import { Toaster as HotToaster } from "react-hot-toast";
import { alpha } from "@mui/system/colorManipulator";
import { useTheme } from "@mui/material/styles";

const Toaster: FC = () => {
    return (
        <HotToaster
            position="bottom-right"
            toastOptions={{
                success: {
                    style: {
                        color: "green",
                    },
                },
                error: {
                    style: {
                        color: "red",
                    },
                },
            }}
        />
    );
};
export default Toaster;
