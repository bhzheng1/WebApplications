import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Button, Modal, Box, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

// the setCount can only be used to update the state within the Example
function Example() {
    // Declare a new state variable, which we'll call "count"
    // setCount accept a callback function which returns new count
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <Button
                variant="contained"
                onClick={() => setCount((preCount) => preCount + 1)}
            >
                Click me
            </Button>
        </div>
    );
}

//parent function
function ModalPopup() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Open popup
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                    <Button variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div>
        <Example />
        <hr />
        <ModalPopup />
    </div>
);
