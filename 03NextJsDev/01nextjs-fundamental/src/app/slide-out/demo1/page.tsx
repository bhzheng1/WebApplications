"use client";

import {
    SlideOutContainer,
    SlideOutData,
} from "@/app/slide-out/_components/slide-out-container";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@mui/material";
import { SlideOutContentDemo } from "@/app/slide-out/_components/SlideOutContentDemo1";

export default function Page() {
    const {
        data: slideOutData,
        open: slideOutOpen,
        handleClose: slideOutHandleClose,
        handleOpen: slideOutHandleOpen,
    } = useDialog<SlideOutData>();

    const openSlide = () => {
        slideOutHandleOpen({
            children: <SlideOutContentDemo />,
            slideOutContext: {},
        });
    };
    return (
        <>
            <Button onClick={openSlide}>Open Slide Out</Button>
            <SlideOutContainer
                isOpen={slideOutOpen}
                onSlideOutClose={slideOutHandleClose}
                slideOutContext={slideOutData?.slideOutContext}
                drawerWidth={slideOutData?.drawerWidth}
            >
                {slideOutData?.children}
            </SlideOutContainer>
        </>
    );
}
