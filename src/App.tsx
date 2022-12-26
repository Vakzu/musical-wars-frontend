import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import MainPage from "./pages/MainPage";
import { FC, createContext, useEffect, useState } from "react";
import FightPage from "./pages/FightPage";
import MyButton from "./components/utility/MyButton";
import { useRef } from "react";
import Carousel, { CarouselItem } from "./components/fight/Carousel";
import { Box } from "@chakra-ui/react";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

interface IAuthContext {
  isAuth: boolean;
  userId?: number;
  username?: string;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ILobbyContext {
  lobbyId?: number;
  setLobbyId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface IWebSocketContext {
  isTriggered: boolean;
  setIsTriggered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as IAuthContext);

export const LobbyContext = createContext({} as ILobbyContext);

export const WebSocketContext = createContext({} as IWebSocketContext);

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [userId, setUserId] = useState<number>();

  const [lobbyId, setLobbyId] = useState<number>();

  const [isTriggered, setIsTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      setIsAuth(Boolean(localStorage.getItem("isAuth")));
      setUsername(localStorage.getItem("username")!);
      setUserId(Number(localStorage.getItem("userId")));
    }
  }, []);

  return (
    <StompSessionProvider
      url={"http://localhost:5000/game"}
      //All options supported by @stomp/stompjs can be used here
    >
      <AuthContext.Provider
        value={{
          isAuth,
          userId,
          username,
          setIsAuth,
          setUserId,
          setUsername,
        }}
      >
        <LobbyContext.Provider
          value={{
            lobbyId,
            setLobbyId,
          }}
        >
          <WebSocketContext.Provider
            value={{
              isTriggered,
              setIsTriggered,
            }}
          >
            <BrowserRouter>
              {isAuth !== false ? (
                <Routes>
                  <Route path="/main" element={<MainPage />} />
                  <Route path="/lobby" element={<LobbyPage />} />
                  <Route path="/fight" element={<FightPage />} />
                  <Route path="*" element={<MainPage />} />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="*" element={<AuthPage />} />
                </Routes>
              )}
            </BrowserRouter>
          </WebSocketContext.Provider>
        </LobbyContext.Provider>
      </AuthContext.Provider>
    </StompSessionProvider>
  );
};

export default App;
