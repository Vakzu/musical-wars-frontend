import { FC, ReactNode } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  CardProps,
} from "@chakra-ui/react";

interface LobbySectionProps {
  sectionName: string;
  children: ReactNode;
}

const LobbySection: FC<LobbySectionProps & CardProps> = ({
  sectionName,
  children,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardBody>
        <Heading size="md">{sectionName}</Heading>
      </CardBody>
      <Divider />
      <CardFooter>{children}</CardFooter>
    </Card>
  );
};

export default LobbySection;
