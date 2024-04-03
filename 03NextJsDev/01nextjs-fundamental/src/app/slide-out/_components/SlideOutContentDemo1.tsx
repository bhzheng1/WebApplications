import { FC, ReactNode } from "react";
import { useSlideOutContext } from "@/app/slide-out/_components/slide-out-container";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export const SlideOutContentDemo: FC<{}> = (props) => {
    const { onSlideOutClose } = useSlideOutContext();
    return (
        <Card>
            <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={"space-between"}
                spacing={2}
            >
                <CardHeader title="Slide Out Content Demo" />
                <IconButton onClick={onSlideOutClose}>
                    <ClearIcon />
                </IconButton>
            </Stack>

            <CardContent>
                slide out content
                <Button onClick={onSlideOutClose}>Close Slide Out</Button>
            </CardContent>
        </Card>
    );
};
