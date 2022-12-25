import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FC } from "react";

export const DarkModeSwitch: FC<IconButtonProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      color={isDark ? "accent" : "black"}
      onClick={toggleColorMode}
      {...props}
    />
  );
};
