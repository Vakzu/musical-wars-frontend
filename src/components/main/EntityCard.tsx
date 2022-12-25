import { FC, ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Stack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import Entity from "../../types/Entity";

interface EntityCardProps {
  entity?: Entity;
  imgSrc?: string;
  onBuy?: () => void;
  onNext?: () => void;
  onRefresh: () => void;
  defaultText: string;
  children?: ReactNode;
}

const EntityCard: FC<EntityCardProps> = (props) => {
  if (props.entity !== undefined) {
    return (
      <Card maxW="md" rounded="md" shadow="md">
        <CardBody>
          {props.imgSrc !== undefined && (
            <Image h='18em' w='sm' src={props.imgSrc} borderRadius="Dark lg" />
          )}
          <Stack mt="3" spacing="3">
            <Heading size="lg">{props.entity.name}</Heading>
            <Text color="blue.600" fontSize="2xl">
              {props.children}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={props.onBuy}>
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={props.onNext}>
              Next
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card maxW="sm" rounded="md" shadow="md">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.defaultText}</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={props.onRefresh}
            >
              Refresh
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
};

export default EntityCard;
