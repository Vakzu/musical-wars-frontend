import AuthPage from "./pages/AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/lobby" element={<LobbyPage/>}/>
        <Route path="/main" element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
