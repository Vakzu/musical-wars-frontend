import { Box, Flex, VStack, useDisclosure } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import LobbySection from "../components/lobby/LobbySection";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import PersonName from "../components/lobby/PersonName";
import InviteCheckbox from "../components/lobby/InviteCheckbox";
import PickCharacterCard from "../components/lobby/PickCharacterCard";
import PickEffectCard from "../components/lobby/PickEffectCard";
import { UserApi } from "../API/UserApi";
import { LobbyApi } from "../API/LobbyApi";
import { AuthContext, LobbyContext } from "../App";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/utility/MyButton";
import { useStompClient, useSubscription } from "react-stomp-hooks";
import { InviteLobbyMessage } from "../types/WSMessage";
import { User } from "../types/User";
import Character from "../types/Character";
import Effect from "../types/Effect";
import Song from "../types/Song";

const LobbyPage: FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);

  const [pickedCharacter, setPickedCharacter] = useState<Character>();
  const [pickedSong, setPickedSong] = useState<Song>();
  const [pickedEffect, setPickedEffect] = useState<Effect>();

  const { isOpen, onToggle } = useDisclosure();

  const { username } = useContext(AuthContext);

  const { lobbyId } = useContext(LobbyContext);

  const navFunction = useNavigate();

  const stompClient = useStompClient();

  useSubscription("topic/lobby/" + lobbyId + "/startFight", (message) =>
    handleStartFight(message.body)
  );

  const handlePickCharacter = (pickedCharacter: Character) => {
    setPickedCharacter(pickedCharacter);
  };

  const handlePickEffect = (pickedEffect: Effect) => {
    setPickedEffect(pickedEffect);
  };

  const handlePickSong = (pickedSong: Song) => {
    setPickedSong(pickedSong);
  };

  const inviteUser = (recepientId: number) => {
    const msg: InviteLobbyMessage = {
      senderName: username!,
      recepientId: recepientId,
      lobbyId: lobbyId!,
    };

    if (stompClient) {
      stompClient.publish({
        destination: "/ws/invite",
        body: JSON.stringify(msg),
      });
    }
  };

  const handleLeave = () => {
    if (isOpen) {
      handleReady();
    }

    LobbyApi.leaveLobby({ lobbyId: lobbyId! })
      .then(() => navFunction("/main"))
      .catch((err) => console.log(err));
  };

  const handleStart = () => {
    if (isOpen) {
      LobbyApi.startLobby({ lobbyId: lobbyId! })
        .then(() => navFunction("/fight"))
        .catch((err) => console.log(err));
    }
  };

  const handleReady = () => {
    if (isOpen) {
      LobbyApi.cancelReady({ lobbyId: lobbyId! })
        .then(onToggle)
        .catch((err) => console.log(err));
    } else {
      LobbyApi.setReady(
        { lobbyId: lobbyId! },
        {
          commandType: "SET_READY",
          characterId: pickedCharacter?.id!,
          songId: pickedSong?.id!,
          effectId: pickedEffect?.id!,
        }
      )
        .then(onToggle)
        .catch((err) => console.log(err));
    }
  };

  //need to parse StartFightMessage
  const handleStartFight = (startFightMessageBody: string) => {};

  useEffect(() => {
    UserApi.getOnlineUsers()
      .then((response) => {
        setOnlineUsers(response.data);
        console.log(onlineUsers);
      })
      .catch((err) => console.log(err));

    LobbyApi.getUsersInLobby({ lobbyId: lobbyId! })
      .then((response) => setLobbyUsers(response.data))
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
                    <Box key={user.id}>
                      <InviteCheckbox onClick={() => inviteUser(user.id)}>
                        <PersonName name={user.name} />
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
                    <Box key={user.id}>
                      <PersonName name={user.name} />
                    </Box>
                  ))}
                </VStack>
              </LobbySection>
            </Box>
          </VStack>

          <VStack align="center" justify="center" w="40%" spacing="4%">
            <Box w="100%">
              <PickCharacterCard
                onPickCharacter={handlePickCharacter}
                onPickSong={handlePickSong}
              />
            </Box>
            <Box w="100%">
              <PickEffectCard onPick={handlePickEffect} />
            </Box>
          </VStack>
        </Flex>
        <Box top="650" left="44%" w="12%" alignItems="center">
          <VStack>
            <MyButton onPushButton={() => handleStart()}>START</MyButton>
            <MyButton onPushButton={() => handleLeave()}>LEAVE</MyButton>
            <MyButton
              type={isOpen ? "solid" : "ghost"}
              colorScheme={isOpen ? "green" : "red"}
              onPushButton={handleReady}
            >
              READY
            </MyButton>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};
/*
1) Приглашение не может потом поменятся на не приглашен
2) Добавить в сокет хендлер который сигнализиирует о том что человека пригласили, он вошел
*/

export default LobbyPage;
