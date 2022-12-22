import { Box, Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface StartButtonProps {
    isLoading?: boolean,
    onPushButton: () => void,
    children: ReactNode
}

const StartButton: FC<StartButtonProps> = (props) => {
    return (
        <Box>
            <Button isLoading={props.isLoading} colorScheme='teal' variant='solid' w='100%' onClick={props.onPushButton}>
                {props.children}
            </Button>
        </Box>
    );
};

export default StartButton;