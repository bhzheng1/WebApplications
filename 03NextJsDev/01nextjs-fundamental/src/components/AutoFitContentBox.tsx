import React, { FC } from "react";
import Box from "@mui/material/Box";

const AutoFitContentBox: FC = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="fit-content"
        >
            {/* Your content goes here */}
            <div>Your content here</div>
        </Box>
    );
};

export default AutoFitContentBox;
