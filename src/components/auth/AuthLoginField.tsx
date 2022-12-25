import React, { FC } from "react";
import { Input, InputProps } from "@chakra-ui/react";

interface AuthLoginFieldProps {
  placeholder: string;
  field: string;
  setField: (field: string) => void;
}

const AuthLoginField: FC<AuthLoginFieldProps & InputProps> = ({
  placeholder,
  field,
  setField,
  ...props
}) => {
  const handleChange = (event: any) => setField(event.target.value);

  return (
    <Input
      {...props}
      value={field}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default AuthLoginField;
