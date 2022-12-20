import React, {FC} from 'react';
import {Input} from '@chakra-ui/react';

interface AuthLoginFieldProps {
    placeholder: string,
    inputSize: string,
    field: string,
    setField: (field: string) => void
}

const AuthLoginField: FC<AuthLoginFieldProps> = (props) => {
    const handleChange = (event: any) => props.setField(event.target.value)

    return (
        <Input
            value={props.field}
            onChange={handleChange}
            placeholder={props.placeholder}
            size={props.inputSize}
        />
    );
};

export default AuthLoginField;