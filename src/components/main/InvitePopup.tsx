import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useContext, useRef, useState } from "react";
import { InviteLobbyMessage } from "../../types/WSMessage";
import { useSubscription } from "react-stomp-hooks";
import { AuthContext } from "../../App";
import { on } from "process";

interface InvitePopupProps {
  onAccept: (lobbyId: string) => void;
}

const InvitePopup: FC<InvitePopupProps> = ({ onAccept }) => {
  const { userId } = useContext(AuthContext);

  const [inviteMessage, setInviteMessage] = useState<InviteLobbyMessage>();

  const { isOpen, onToggle } = useDisclosure();

  const cancelRef = useRef();

  useSubscription("/user/" + userId + "/queue/invites", (message) =>
    handleInvite(message.body)
  );

  //need to parse InviteLobbyMessage
  const handleInvite = (inviteBody: string) => {
    let obj: InviteLobbyMessage = JSON.parse(inviteBody);
    setInviteMessage(obj)
    if (!isOpen) onToggle()


    // if (obj.senderName !== undefined && obj.lobbyId !== undefined) {
    //   setSenderName(obj.senderName);
    //   setLobbyId(obj.lobbyId);
    // }
  };

  const handleAccept = () => {
    onToggle();
    onAccept(inviteMessage?.lobbyId!);
  };

  return (
    <Box>
      <AlertDialog
        isOpen={isOpen}
        // @ts-ignore
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              New invite from {inviteMessage?.senderName}
            </AlertDialogHeader>

            <AlertDialogFooter>
              {
                //@ts-ignore
                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                  Reject
                </Button>
              }
              <Button colorScheme="green" onClick={handleAccept} ml={3}>
                Accept
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default InvitePopup;