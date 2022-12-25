import React, { FC, ReactNode } from "react";

import { Box, Button, ButtonProps } from "@chakra-ui/react";

interface AuthButtonProps {
  isLoading?: boolean;
  onPushButton: () => void;
  type?: "solid" | "ghost";
  children: ReactNode;
}

const AuthButton: FC<AuthButtonProps> = (props) => {
  return (
    <Box>
      <Button
        isLoading={props.isLoading}
        colorScheme="teal"
        variant={props.type ? props.type : 'solid'}
        size="lg"
        onClick={props.onPushButton}
      >
        {props.children}
      </Button>
    </Box>
  );
};

export default AuthButton;
