import { LockIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FC } from "react";

export const ExitButton: FC<IconButtonProps> = (props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      icon={<LockIcon />}
      color={isDark ? "accent" : "black"}
      onClick={props.onClick}
      {...props}
    />
  );
};