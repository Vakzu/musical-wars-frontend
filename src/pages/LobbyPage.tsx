import { Box, Flex, VStack } from "@chakra-ui/react";
import { FC } from "react";
import LobbySection from "../components/lobby/LobbySection";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import PersonName from "../components/lobby/PersonName";
import InviteCheckbox from "../components/lobby/InviteCheckbox";
import EntityCard from "../components/main/EntityCard";
import StartButton from "../components/main/StartButton";

interface LobbyPageProps {}
const handleStart = () => {
  // LobbyApi.createLobby({userId});
  // LobbySocket.connect();
};

const LobbyPage: FC<LobbyPageProps> = (props) => {
  //   const [onlineUsers, setOnlineUsers] = useState([]);
  //   const [lobbyUsers, setLobbyUsers] = useState([]);

  const userExample: string = "dmittrey";

  const onlineUsers: string[] = [userExample, "zubrailx"];
  const lobbyUsers: string[] = [userExample];

  return (
    <Box className="LobbyPage">
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
      <Flex position="absolute" justify="center" align="center" top="20" w='100%'>
        <VStack align="center" justify="center" w="60%" spacing="4%">
          <Box w="90%">
            <LobbySection sectionName="ONLINE">
              <VStack>
                {onlineUsers.map((user) => (
                  <Box key={user}>
                    <InviteCheckbox>
                      <PersonName name={user} />
                    </InviteCheckbox>
                  </Box>
                ))}
              </VStack>
            </LobbySection>
          </Box>
          <Box w="90%">
            <LobbySection sectionName="LOBBY">
              <VStack>
                {lobbyUsers.map((user) => (
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
            <EntityCard
              onRefresh={() => {}}
              defaultText="Heroes not found!"
            ></EntityCard>
          </Box>
          <Box w="100%">
            <EntityCard
              onRefresh={() => {}}
              defaultText="Effects not found!"
            ></EntityCard>
          </Box>
        </VStack>
      </Flex>
      <Box pos="absolute" top="650" left="44%" w="12%" alignItems="center">
        <VStack>
          <StartButton onPushButton={() => handleStart()}>START</StartButton>
          <StartButton onPushButton={() => handleStart()}>LEAVE</StartButton>
        </VStack>
      </Box>
    </Box>
  );
};

export default LobbyPage;
