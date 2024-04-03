import { Box, Drawer } from "@mui/material";
import { FC, createContext, useContext, useMemo } from "react";
import { Scrollbar } from "@/components/Scrollbar";

export type SlideOutData = {
    children?: React.ReactNode;
    slideOutContext?: any;
    drawerWidth?: number | string;
};
export type SlideOutContextType = {
    onSlideOutClose: () => void;
    [key: string]: any;
};
export const SlideOutContext = createContext<SlideOutContextType>({
    onSlideOutClose: () => {},
});
export const useSlideOutContext = () => useContext(SlideOutContext);

type SlideOutContainerProps = {
    children: React.ReactNode;
    onSlideOutClose: () => void;
    isOpen?: boolean;
    slideOutContext?: any;
    drawerWidth?: number | string;
};

/*
The container includes a context props to pass down context to children components.
The container could be added to any page.
The container requires the onSlideOutClose function and children.
*/
export const SlideOutContainer: FC<SlideOutContainerProps> = (props) => {
    const {
        isOpen = false,
        onSlideOutClose,
        slideOutContext,
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

    const slideOutContextValue = useMemo(
        () => ({ onSlideOutClose, ...slideOutContext }),
        [onSlideOutClose, slideOutContext]
    );
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
                <SlideOutContext.Provider value={slideOutContextValue}>
                    <Box
                        component={"main"}
                        sx={{
                            flexGrow: 1,
                        }}
                    >
                        {children}
                    </Box>
                </SlideOutContext.Provider>
            </Scrollbar>
        </Drawer>
    );
};
