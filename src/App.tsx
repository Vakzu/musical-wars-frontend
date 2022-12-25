import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import MainPage from "./pages/MainPage";
import { createContext, useEffect, useState } from "react";
import FightPage from "./pages/FightPage";

interface IAuthContext {
  userId?: number;
  username?: string;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface ILobbyContext {
  lobbyId?: number;
  setLobbyId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const AuthContext = createContext({} as IAuthContext);
export const LobbyContext = createContext({} as ILobbyContext);

function App() {
  const [username, setUsername] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [lobbyId, setLobbyId] = useState<number>();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username")!);
      setUserId(Number(localStorage.getItem("userId")));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        username,
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
          {username !== undefined ? (
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
  );
}

export default App;
