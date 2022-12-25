import { FC, ReactNode, useEffect, useState } from "react";
import Character from "../../types/Character";
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
  Box,
} from "@chakra-ui/react";
import { CharacterApi } from "../../API/CharacterApi";
import { FaHeartbeat } from "react-icons/fa";

interface PickCharacterCardProps {
  imgH?: string;
  onPick?: (c: Character) => void;
  children?: ReactNode;
}

const PickCharacterCard: FC<PickCharacterCardProps> = ({imgH, onPick, children}) => {
  const [charactersList, setCharactersList] = useState<Character[]>([]);

  const [currentCharacterId, setCurrentCharacterId] = useState<number>(0);

  const handleRefresh = () => {
    CharacterApi.getAll()
      .then((response) =>
        setCharactersList(
          response.data.characters ? response.data.characters : []
        )
      )
      .catch((err) => console.log(err));
  };

  const handlePick = () => {
    if (onPick !== undefined) onPick(currentCharacter);
  };

  const handleNext = () => {
    if (currentCharacterId + 1 === charactersList.length) {
      setCurrentCharacterId(0);
    } else {
      setCurrentCharacterId(currentCharacterId + 1);
    }
  };

  const currentCharacter = charactersList[currentCharacterId];

  useEffect(() => {
    handleRefresh();
  }, []);

  if (charactersList.length !== 0) {
    return (
      <Card maxW="md" rounded="md" shadow="md">
        <CardBody>
          {currentCharacter !== undefined && (
            <Image
              h={imgH}
              w="sm"
              src={currentCharacter.imgSrc}
              borderRadius="Dark lg"
            />
          )}
          <Stack mt="3" spacing="3">
            <Heading size="lg">{currentCharacter.name}</Heading>
            <Text color="blue.600" fontSize="2xl">
              <Box>
                <FaHeartbeat />
                {currentCharacter.health}
              </Box>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={handlePick}>
              Pick
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={handleNext}>
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
            <Heading size="md">Characters not found</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={handleRefresh}>
              Refresh
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
};

export default PickCharacterCard;
