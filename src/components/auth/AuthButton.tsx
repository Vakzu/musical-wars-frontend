import React, {ReactNode} from 'react';

import {Box, Button} from '@chakra-ui/react'

export enum AuthButtonType {
    SOLID = 'solid',
    GHOST = 'ghost'
}

interface AuthButtonProps {
    isLoading?: boolean,
    onPushButton: () => void,
    type: AuthButtonType,
    children: ReactNode
}

const AuthButton = (props: AuthButtonProps) => {
    return (
        <Box>
            <Button isLoading={props.isLoading} colorScheme='teal' variant={props.type} size='lg' onClick={props.onPushButton}>
                {props.children}
            </Button>
        </Box>
    );
};

export default AuthButton;