import React, { useState } from 'react';

// the setCount can only be used to update the state within the Example
export function Example() {
    // Declare a new state variable, which we'll call "count"
    // setCount accept a callback function which returns new count
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(preCount => preCount + 1)}>
                Click me
            </button>
        </div>
    );
}

//parent function
export function ModalPopup() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(!open)}>
                Open popup
            </button>

            {open &&
                <div>
                    <FormComponent />
                </div>
            }
        </>
    );
}

// child function
function FormComponent({
    setOpen
}) {
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // To close the popup in <ModalPopup/>
        setOpen(false);
    }

    return (
        <>
            <button onClick={handleSubmit}>
                close popup
            </button>
        </>
    );
}