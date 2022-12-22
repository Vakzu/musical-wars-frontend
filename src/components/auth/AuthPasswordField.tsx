import React, { FC } from "react";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface AuthPasswordFieldProps {
  placeholder: string;
  isInvalid: boolean;
  inputGroupSize: string;
  inputRightPadding: string;
  rightElementWidth: string;
  rightElementButtonHeight: string;
  rightElementButtonSize: string;
  field: string;
  setField: (field: string) => void;
}

const AuthPasswordField: FC<AuthPasswordFieldProps> = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => props.setField(event.target.value);

  return (
    <InputGroup size={props.inputGroupSize}>
      <Input
        isInvalid={props.isInvalid}
        errorBorderColor="crimson"
        value={props.field}
        onChange={handleChange}
        pr={props.inputRightPadding}
        type={show ? "text" : "password"}
        placeholder={props.placeholder}
      />
      <InputRightElement width={props.rightElementWidth}>
        <Button
          h={props.rightElementButtonHeight}
          size={props.rightElementButtonSize}
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default AuthPasswordField;
