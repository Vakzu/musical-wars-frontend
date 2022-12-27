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
  Box,
} from "@chakra-ui/react";
import { CharacterApi } from "../../API/CharacterApi";
import { FaHeartbeat } from "react-icons/fa";
import Song from "../../types/Song";
import SongMenu from "./SongMenu";

interface PickCharacterCardProps {
  onPickCharacter: (c: Character) => void;
  onPickSong: (s: Song) => void;
}

const PickCharacterCard: FC<PickCharacterCardProps> = ({
  onPickCharacter,
  onPickSong,
}) => {
  const [charactersList, setCharactersList] = useState<Character[]>([]);

  const [songsList, setSongsList] = useState<Song[]>([]);

  const [currentCharacterId, setCurrentCharacterId] = useState<number>(0);

  const handleCharactersRefresh = () => {
    CharacterApi.getAll()
      .then((response) => {
        setCharactersList(response.data ? response.data : []);
      })
      .catch((err) => console.log(err));
  };

  const handleSongsRefresh = (characterId: number) => {
    CharacterApi.getSongs(characterId)
      .then((response) => {
        setSongsList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePickCharacter = () => {
    onPickCharacter(currentCharacter);
  };

  const handlePickSong = (song: Song) => {
    onPickSong(song);
  };

  const handleNextCharacter = () => {
    if (currentCharacterId + 1 === charactersList.length) {
      setCurrentCharacterId(0);
    } else {
      setCurrentCharacterId(currentCharacterId + 1);
    }
  };

  const currentCharacter = charactersList[currentCharacterId];

  useEffect(() => {
    handleCharactersRefresh();
  }, []);

  useEffect(() => {
    handleSongsRefresh(currentCharacter?.id);
  }, [currentCharacter]);

  if (charactersList.length !== 0) {
    return (
      <Card maxW="md" rounded="md" shadow="md">
        <CardBody>
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
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handlePickCharacter}
            >
              Pick
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={handleNextCharacter}
            >
              Next
            </Button>
            <SongMenu
              songList={songsList}
              onClick={(song: Song) => handlePickSong(song)}
            />
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
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleCharactersRefresh}
            >
              Refresh
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
};

export default PickCharacterCard;
