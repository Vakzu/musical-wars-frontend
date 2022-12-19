import React from 'react';
import {Button, Input, InputGroup, InputRightElement} from '@chakra-ui/react';

interface AuthPasswordFieldProps {
    placeholder: string
    inputGroupSize: string,
    inputRightPadding: string,
    rightElementWidth: string,
    rightElementButtonHeight: string,
    rightElementButtonSize: string
}

const AuthPasswordField = (props: AuthPasswordFieldProps) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <InputGroup size={props.inputGroupSize}>
            <Input
                pr={props.inputRightPadding}
                type={show ? 'text' : 'password'}
                placeholder={props.placeholder}
            />
            <InputRightElement width={props.rightElementWidth}>
                <Button h={props.rightElementButtonHeight} size={props.rightElementButtonSize} onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

export default AuthPasswordField;