import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface PersonNameProps {
  name: string;
}

const PersonName: FC<PersonNameProps> = (props) => {
  return (
    <Box>
      <Text fontSize="lg" as='b'>{props.name}</Text>
    </Box>
  );
};

export default PersonName;
