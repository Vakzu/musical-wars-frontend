import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import MainPage from "./pages/MainPage";
import { FC, createContext, useEffect, useState } from "react";
import FightPage from "./pages/FightPage";
import { StompSessionProvider } from "react-stomp-hooks";
import { FightTurn } from "./types/Fight";

interface IAuthContext {
  isAuth: boolean;
  userId?: number;
  username?: string;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ILobbyContext {
  lobbyId?: string;
  setLobbyId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface IFightMovesContext {
  turns: FightTurn[];
  setTurns: React.Dispatch<React.SetStateAction<FightTurn[]>>;
}

export const AuthContext = createContext({} as IAuthContext);

export const LobbyContext = createContext({} as ILobbyContext);

export const FightMovesContext = createContext({} as IFightMovesContext);

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();
  const [userId, setUserId] = useState<number>();

  const [lobbyId, setLobbyId] = useState<string>();

  const [turns, setTurns] = useState<FightTurn[]>([]);

  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      setIsAuth(Boolean(localStorage.getItem("isAuth")));
      setUsername(localStorage.getItem("username")!);
      setUserId(Number(localStorage.getItem("userId")));
    }

    if (localStorage.getItem("lobbyId")) {
      setLobbyId(localStorage.getItem("lobbyId")!);
    }
  }, []);

  return (
    <FightMovesContext.Provider
      value={{
        turns,
        setTurns,
      }}
    >
      <StompSessionProvider
        url={"http://localhost:8080/game"}
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
          </LobbyContext.Provider>
        </AuthContext.Provider>
      </StompSessionProvider>
    </FightMovesContext.Provider>
  );
};

export default App;