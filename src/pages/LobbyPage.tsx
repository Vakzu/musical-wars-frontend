import { Box, Flex, VStack } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import LobbySection from "../components/lobby/LobbySection";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import PersonName from "../components/lobby/PersonName";
import InviteCheckbox from "../components/lobby/InviteCheckbox";
import StartButton from "../components/main/StartButton";
import PickCharacterCard from "../components/lobby/PickCharacterCard";
import PickEffectCard from "../components/lobby/PickEffectCard";
import { UserApi } from "../API/UserApi";
import { LobbyApi } from "../API/LobbyApi";
import { LobbyContext } from "../App";


const LobbyPage: FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const [lobbyUsers, setLobbyUsers] = useState<string[]>([]);

  const { lobbyId } = useContext(LobbyContext);

  const handlePickCharacter = () => {};

  const handlePickEffect = () => {};

  const inviteUser = (username: string) => {
    UserApi.inviteToLobby(username, lobbyId!);
  };

  const handleLeave = () => {
    LobbyApi.leaveLobby({ lobbyId: lobbyId! });
  };

  const handleStart = () => {
    LobbyApi.startLobby({ lobbyId: lobbyId! });
  };

  useEffect(() => {
    UserApi.getOnlineUsers()
      .then((response) => setOnlineUsers(response.data.userNames))
      .catch((err) => console.log(err));

    LobbyApi.getUsersInLobby()
      .then((response) => setLobbyUsers(response.data.userNames))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className="LobbyPage">
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
      <VStack position="absolute" top="20" w="100%">
        <Flex justify="center" align="center" w="100%">
          <VStack align="center" justify="center" w="60%" spacing="4%">
            <Box w="90%">
              <LobbySection sectionName="ONLINE">
                <VStack align="left">
                  {onlineUsers?.map((user) => (
                    <Box key={user}>
                      <InviteCheckbox onClick={() => inviteUser(user)}>
                        <PersonName name={user} />
                      </InviteCheckbox>
                    </Box>
                  ))}
                </VStack>
              </LobbySection>
            </Box>
            <Box w="90%">
              <LobbySection sectionName="LOBBY">
                <VStack align="left">
                  {lobbyUsers?.map((user) => (
                    <Box key={user}>
                      <PersonName name={user} />
                    </Box>
                  ))}
                </VStack>
              </LobbySection>
            </Box>
          </VStack>

          <VStack align="center" justify="center" w="40%" spacing="4%">
            <Box w="100%">
              <PickCharacterCard imgH="12em" onPick={handlePickCharacter} />
            </Box>
            <Box w="100%">
              <PickEffectCard onPick={handlePickEffect} />
            </Box>
          </VStack>
        </Flex>
        <Box top="650" left="44%" w="12%" alignItems="center">
          <VStack>
            <StartButton onPushButton={() => handleStart()}>START</StartButton>
            <StartButton onPushButton={() => handleLeave()}>LEAVE</StartButton>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default LobbyPage;
