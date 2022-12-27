import { Box, Flex, HStack, VStack, useDisclosure } from "@chakra-ui/react";
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
import {
  InviteLobbyMessage,
  MembersChangeMessage,
  ReadyStateChangeMessage,
} from "../types/WSMessage";
import { User, UserInLobby } from "../types/User";
import Character from "../types/Character";
import Effect from "../types/Effect";
import Song from "../types/Song";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";
import { CheckCircleIcon, ViewIcon } from "@chakra-ui/icons";

const LobbyPage: FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const [lobbyUsers, setLobbyUsers] = useState<UserInLobby[]>([]);

  const [pickedCharacter, setPickedCharacter] = useState<Character>();
  const [pickedSong, setPickedSong] = useState<Song>();
  const [pickedEffect, setPickedEffect] = useState<Effect>();

  const { isOpen, onToggle } = useDisclosure();

  const { username, userId } = useContext(AuthContext);

  const { lobbyId } = useContext(LobbyContext);

  const navFunction = useNavigate();

  const stompClient = useStompClient();

  useSubscription("/topic/online", (message) =>
    handleChangeOnline(message.body)
  );

  useSubscription("/topic/lobby/" + lobbyId + "/changeMembers", (message) =>
    handleChangeLobbyMembers(message.body)
  );
  useSubscription("/topic/lobby/" + lobbyId + "/changeReady", (message) =>
    handleChangeReadyState(message.body)
  );
  useSubscription("/topic/lobby/" + lobbyId + "/startFight", (message) =>
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

  //need to parse MembersChangeMessage
  const handleChangeOnline = (onlineMessageBody: string) => {
    let obj: MembersChangeMessage = JSON.parse(onlineMessageBody);
    console.log(obj);

    handleRefreshOnline();
  };

  //need to parse MembersChangeMessage
  const handleChangeLobbyMembers = (lobbyMembersChangeBody: string) => {
    let obj: MembersChangeMessage = JSON.parse(lobbyMembersChangeBody);
    console.log(obj);

    handleRefreshLobby();
  };

  //need to parse ReadyStateChangeMessage
  const handleChangeReadyState = (changeReadyStateBody: string) => {
    let obj: ReadyStateChangeMessage = JSON.parse(changeReadyStateBody);
    console.log(obj);

    handleRefreshLobby();
  };
  
  //need to parse StartFightMessage
  const handleStartFight = (startFightMessageBody: string) => {
    let obj: ReadyStateChangeMessage = JSON.parse(startFightMessageBody);
    console.log(obj);
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
    LobbyApi.startLobby({ lobbyId: lobbyId! }).then((response) => {
      if (response.data == userId) {
        if (isOpen) {
          LobbyApi.startLobby({ lobbyId: lobbyId! })
            .then(() => navFunction("/fight"))
            .catch((err) => console.log(err));
        }
      }
    });
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

  const handleRefreshOnline = () => {
    UserApi.getOnlineUsers()
      .then((response) => {
        setOnlineUsers(response.data);
        console.log(onlineUsers);
      })
      .catch((err) => console.log(err));
  };

  const handleRefreshLobby = () => {
    LobbyApi.getUsersInLobby({ lobbyId: lobbyId! })
      .then((response) => setLobbyUsers(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleRefreshOnline();
    handleRefreshLobby();
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
                      <HStack>
                        {user.isReady ? (
                          <HiStatusOnline />
                        ) : (
                          <HiStatusOffline />
                        )}
                      </HStack>
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

export default LobbyPage;
