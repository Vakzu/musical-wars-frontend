import { Checkbox } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import CustomIcon from "./CustomIcon";

interface InviteCheckboxProps {
  children: ReactNode;
}

const InviteCheckbox: FC<InviteCheckboxProps> = (props) => {
  return (
    <Checkbox icon={<CustomIcon />} colorScheme="cyan">
      {props.children}
    </Checkbox>
  );
};

export default InviteCheckbox;
