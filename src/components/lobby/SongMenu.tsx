import { FC } from "react";
import Song from "../../types/Song";
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface SongMenuProps {
  songList: Song[];
  onPick: (c: Song) => void;
}

const SongMenu: FC<SongMenuProps> = ({ songList, onPick }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Songs
      </MenuButton>
      <MenuList>
        {songList?.map((song) => (
          <MenuItem key={song.id} onClick={() => onPick(song)}>
            <HStack>
              <Box>{song.name}</Box>
              <Box>{song.damage}</Box>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SongMenu;
