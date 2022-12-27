import { FC, useState } from "react";
import Song from "../../types/Song";
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";

interface SongMenuProps {
  songList: Song[];
  onClick: (c: Song) => void;
}

const SongMenu: FC<SongMenuProps> = ({ songList, onClick }) => {
  const [currentSong, setCurrentSong] = useState<Song | undefined>(songList[0]);

  const handleClick = (song: Song) => {
    setCurrentSong(song);
    onClick(song);
  };

  return songList ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Songs
      </MenuButton>
      <MenuList>
        {songList?.map((song) => (
          <MenuItem key={song.id} onClick={() => handleClick(song)}>
            <HStack>
              {currentSong?.id === song.id && <CheckCircleIcon />}
              <Box>{song.name}</Box>
              <Box>{song.damage}</Box>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  ) : (
    <Box></Box>
  );
};

export default SongMenu;
