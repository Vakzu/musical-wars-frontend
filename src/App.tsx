import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import MainPage from "./pages/MainPage";
import { FC, createContext, useEffect, useState } from "react";
import FightPage from "./pages/FightPage";
import { StompSessionProvider } from "react-stomp-hooks";

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

export const AuthContext = createContext({} as IAuthContext);

export const LobbyContext = createContext({} as ILobbyContext);

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [userId, setUserId] = useState<number>();

  const [lobbyId, setLobbyId] = useState<string>();

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
    <BrowserRouter>
      {isAuth !== false ? (
        <StompSessionProvider url={"http://localhost:8080/game"}>
          <LobbyContext.Provider
            value={{
              lobbyId,
              setLobbyId,
            }}
          >
            <Routes>
              <Route path="/main" element={<MainPage />} />
              <Route path="/lobby" element={<LobbyPage />} />
              <Route path="/fight" element={<FightPage />} />
              <Route path="*" element={<MainPage />} />
            </Routes>
          </LobbyContext.Provider>
        </StompSessionProvider>
      ) : (
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
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />
          </Routes>
        </AuthContext.Provider>
      )}
    </BrowserRouter>
  );
};

export default App;
