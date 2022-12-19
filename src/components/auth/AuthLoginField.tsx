import React, {FC} from 'react';
import {Input} from '@chakra-ui/react';

interface AuthLoginFieldProps {
    placeholder: string,
    inputSize: string
}

const AuthLoginField: FC<AuthLoginFieldProps> = (props) => {
    const [value, setValue] = React.useState('')
    const handleChange = (event: any) => setValue(event.target.value)

    return (
        <Input
            value={value}
            onChange={handleChange}
            placeholder={props.placeholder}
            size={props.inputSize}
        />
    );
};

export default AuthLoginField;