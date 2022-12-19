import React, {ReactNode} from 'react';

import {Box, Button} from '@chakra-ui/react'

export enum AuthButtonType {
    SOLID = 'solid',
    GHOST = 'ghost'
}

interface AuthButtonProps {
    isLoading?: boolean,
    type: AuthButtonType,
    children: ReactNode
}

const AuthButton = (props: AuthButtonProps) => {
    return (
        <Box>
            <Button isLoading={props.isLoading} colorScheme='teal' variant={props.type} size='lg'>
                {props.children}
            </Button>
        </Box>
    );
};

export default AuthButton;