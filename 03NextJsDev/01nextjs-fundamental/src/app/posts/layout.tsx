import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main>{children}</main>

            <hr />
            <div>Navigate to Top</div>
        </>
    );
};
export default layout;
