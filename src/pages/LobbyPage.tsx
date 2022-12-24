import { Box, Divider, Flex, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import Section from "../components/lobby/LobbySection";
import LobbySection from "../components/lobby/LobbySection";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import PersonName from "../components/lobby/PersonName";
import InviteCheckbox from "../components/lobby/InviteCheckbox";
import EntityCard from "../components/main/EntityCard";
import StartButton from "../components/main/StartButton";

interface LobbyPageProps {}

/*
1) Отрефакторить компонент EntityCard
2) Отрефакторить компонент кнопки

*/
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
      <VStack
        position="absolute"
        align="center"
        justify="center"
        w="60%"
        p="3%"
        spacing="4%"
      >
        <Box w="90%">
          <LobbySection sectionName="ONLINE">
            <VStack>
              {onlineUsers.map((user) => (
                <Box>
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
            {lobbyUsers.map((user) => (
              <Box>
                <PersonName name={user} />
              </Box>
            ))}
          </LobbySection>
        </Box>
      </VStack>

      <VStack
        position="absolute"
        align="center"
        justify="center"
        right="0%"
        w="40%"
        p="3%"
        spacing="4%"
      >
        <Box w="100%">
          <EntityCard
            onRefresh={() => {}}
            entityType={EntityType.HERO}
          >
            
          </EntityCard>
        </Box>
        <Box w="100%">
          <EntityCard
            onRefresh={() => {}}
            entityType={EntityType.EFFECT}
          >

          </EntityCard>
        </Box>
      </VStack>

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
