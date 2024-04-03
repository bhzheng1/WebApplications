import { FC } from "react";
import { useSlideOutContext } from "@/app/slide-out/_hooks/use-slide-out";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export const SlideOutContentDemo: FC<{ closeSlide?: () => void }> = (props) => {
    const { slideOutHandleClose } = useSlideOutContext();
    const { closeSlide = slideOutHandleClose } = props;
    return (
        <Card>
            <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={"space-between"}
                spacing={2}
            >
                <CardHeader title="Slide Out Content Demo" />
                <IconButton onClick={slideOutHandleClose}>
                    <ClearIcon />
                </IconButton>
            </Stack>

            <CardContent>
                slide out content
                <Button onClick={closeSlide}>Close Slide Out</Button>
            </CardContent>
        </Card>
    );
};
