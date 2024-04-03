//https://rajeshnaroth.medium.com/managing-nested-forms-gracefully-with-formik-a7ed35788653
import React from "react";
import Form1 from "./WithCustomField";
import type { FC } from "react";
import ReactDOM from "react-dom/client";

const App: FC = () => (
    <div>
        <Form1 />
    </div>
);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
