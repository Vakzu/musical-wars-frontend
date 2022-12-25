import { StarIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { FC } from "react";

export const StatsButton: FC<IconButtonProps> = (props) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      icon={<StarIcon />}
      color={isDark ? "accent" : "black"}
      onClick={props.onClick}
      {...props}
    />
  );
};
