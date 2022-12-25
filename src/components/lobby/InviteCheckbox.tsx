import { Checkbox } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import CustomIcon from "./CustomIcon";

interface InviteCheckboxProps {
  children: ReactNode;
  onClick: () => void
}

const InviteCheckbox: FC<InviteCheckboxProps> = (props) => {
  const handleClick = (isChecked: boolean) => {
    if (isChecked) props.onClick()
  }

  return (
    <Checkbox icon={<CustomIcon />} colorScheme="cyan" onChange={(e) => handleClick(e.target.checked)}>
      {props.children}
    </Checkbox>
  );
};

export default InviteCheckbox;
