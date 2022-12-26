import { FC, ReactNode } from "react";

import { Button } from "@chakra-ui/react";

interface MyButtonProps {
  isLoading?: boolean;
  onPushButton: () => void;
  type?: "solid" | "ghost";
  colorScheme?: string;
  ref?: React.MutableRefObject<any>;
  children?: ReactNode;
}

const MyButton: FC<MyButtonProps> = (props) => {
  return (
    <Button
      w="100%"
      isLoading={props.isLoading}
      colorScheme={props.colorScheme ? props.colorScheme : "teal"}
      variant={props.type ? props.type : "solid"}
      size="lg"
      onClick={props.onPushButton}
      ref={props.ref}
    >
      {props.children}
    </Button>
  );
};

export default MyButton;
