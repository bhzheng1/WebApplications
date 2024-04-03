import { Box, Drawer } from "@mui/material";
import { FC, createContext, useContext, useMemo } from "react";
import { Scrollbar } from "@/components/Scrollbar";
import { useDialog } from "@/hooks/use-dialog";

type SlideOutProps = {
    children: React.ReactNode;
    drawerWidth?: number | string;
};

type SlideOutContextType = {
    slideOutHandleClose: () => void;
    slideOutOpen: boolean;
    slideOutData?: SlideOutProps;
    slideOutHandleOpen: (data?: SlideOutProps) => void;
};
const SlideOutContext = createContext<SlideOutContextType>({
    slideOutHandleClose: () => {},
    slideOutOpen: false,
    slideOutData: { children: <></> },
    slideOutHandleOpen: () => {},
});

export const useSlideOutContext = () => useContext(SlideOutContext);

type SlideOutContainerProps = {
    children: React.ReactNode;
    onSlideOutClose: () => void;
    isOpen?: boolean;
    drawerWidth?: number | string;
};

/*
The container could be added to any page.
The container requires the onSlideOutClose function and children.
*/
export const SlideOutContainer: FC<SlideOutContainerProps> = (props) => {
    const {
        isOpen = false,
        onSlideOutClose,
        drawerWidth = "50%",
        children,
    } = props;
    const handleModelClose = (
        event: object,
        reason: "escapeKeyDown" | "backdropClick"
    ) => {
        if (reason !== "backdropClick") {
            onSlideOutClose();
        }
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: drawerWidth },
            }}
            anchor="right"
            open={isOpen}
            variant="temporary"
            onClose={onSlideOutClose}
            ModalProps={{ onClose: handleModelClose }}
        >
            <Scrollbar>
                <Box
                    component={"main"}
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    {children}
                </Box>
            </Scrollbar>
        </Drawer>
    );
};

export const SlideOutContainerProvider: FC<{ children: React.ReactNode }> = (
    props
) => {
    const { children } = props;
    const {
        data: slideOutData,
        open: slideOutOpen,
        handleClose: slideOutHandleClose,
        handleOpen: slideOutHandleOpen,
    } = useDialog<SlideOutProps>();

    const slideOutContextValue = useMemo(
        () => ({
            slideOutHandleClose,
            slideOutOpen,
            slideOutData,
            slideOutHandleOpen,
        }),
        [slideOutHandleClose, slideOutOpen, slideOutData, slideOutHandleOpen]
    );
    return (
        <SlideOutContext.Provider value={slideOutContextValue}>
            {children}
            <SlideOutContainer
                isOpen={slideOutContextValue.slideOutOpen}
                onSlideOutClose={slideOutContextValue.slideOutHandleClose}
                drawerWidth={
                    slideOutContextValue.slideOutData?.drawerWidth ?? "50%"
                }
            >
                {slideOutContextValue.slideOutData?.children}
            </SlideOutContainer>
        </SlideOutContext.Provider>
    );
};
