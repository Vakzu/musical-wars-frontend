import { FC, ReactNode } from "react";

import { Button } from "@chakra-ui/react";

interface MyButtonProps {
  isLoading?: boolean;
  onPushButton: () => void;
  type?: "solid" | "ghost";
  children: ReactNode;
}

const MyButton: FC<MyButtonProps> = (props) => {
  return (
    <Button
      w="100%"
      isLoading={props.isLoading}
      colorScheme="teal"
      variant={props.type ? props.type : "solid"}
      size="lg"
      onClick={props.onPushButton}
    >
      {props.children}
    </Button>
  );
};

export default MyButton;
