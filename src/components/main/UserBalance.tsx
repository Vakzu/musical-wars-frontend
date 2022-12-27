import { Box, Collapse, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

interface UserBalanceProps {
  balance?: number;
}

const UserBalance: FC<UserBalanceProps> = (props) => {
  return props.balance ? (
    <Heading size="md" color="teal">
      ${props.balance}
    </Heading>
  ) : (
    <Box />
  );
};

export default UserBalance;
