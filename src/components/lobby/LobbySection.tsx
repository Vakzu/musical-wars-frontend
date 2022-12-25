import { FC, ReactNode } from "react";
import { Card, CardBody, CardFooter, Heading, Divider } from "@chakra-ui/react";

interface LobbySectionProps {
  sectionName: string;
  w?: any;
  h?: any;
  children: ReactNode;
}

const LobbySection: FC<LobbySectionProps> = (props) => {
  return (
    <Card>
      <CardBody>
        <Heading size="md">{props.sectionName}</Heading>
      </CardBody>
      <Divider />
      <CardFooter>{props.children}</CardFooter>
    </Card>
  );
};

export default LobbySection;
