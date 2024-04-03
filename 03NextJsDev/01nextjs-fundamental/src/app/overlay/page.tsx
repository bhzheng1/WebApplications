"use client";
import React, { createRef } from "react";

export default function OverlayPage() {
    const anchorEl = createRef<HTMLDivElement>();
    return (
        <div>
            <div ref={anchorEl}>ssss</div>
            test
        </div>
    );
}
