import { Checkbox } from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";
import CustomIcon from "./CustomIcon";

interface InviteCheckboxProps {
  onClick: () => void;
  children: ReactNode;
}

const InviteCheckbox: FC<InviteCheckboxProps> = ({ onClick, children }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (isChecked: boolean) => {
    if (isChecked) {
      onClick();
      setIsDisabled(true);
    }
  };

  return (
    <Checkbox
      icon={<CustomIcon />}
      colorScheme="cyan"
      isDisabled={isDisabled}
      onChange={(e) => handleClick(e.target.checked)}
    >
      {children}
    </Checkbox>
  );
};

export default InviteCheckbox;
