"use client";

import { Box, Button } from "@mui/material";
import { SlideOutContentDemo } from "@/app/slide-out/_components/SlideOutContentDemo2";
import {
    SlideOutContainerProvider,
    useSlideOutContext,
} from "@/app/slide-out/_hooks/use-slide-out";
import toast from "react-hot-toast";

const SlideOutComponent = () => {
    // must be used within children components
    const { slideOutHandleClose, slideOutHandleOpen } = useSlideOutContext();
    const closeSlide = () => {
        toast.success("Slide Out Closed");
        slideOutHandleClose();
        console.log("closeSlide");
    };
    const openSlide = () => {
        slideOutHandleOpen({
            children: <SlideOutContentDemo closeSlide={closeSlide} />,
        });
    };
    return (
        <Box>
            <Button onClick={openSlide}>Open Slide Out</Button>
        </Box>
    );
};

export default function Page() {
    return (
        <SlideOutContainerProvider>
            <SlideOutComponent />
        </SlideOutContainerProvider>
    );
}
