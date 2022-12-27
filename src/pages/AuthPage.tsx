import React, { useContext } from "react";
import { Box, Flex, Image, useColorMode } from "@chakra-ui/react";
import AuthPasswordField from "../components/auth/AuthPasswordField";
import AuthLoginField from "../components/auth/AuthLoginField";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import { AuthApi } from "../API/AuthApi";
import AuthAlert from "../components/auth/AuthAlert";
import { AuthContext } from "../App";
import MyButton from "../components/utility/MyButton";
import { useStompClient } from "react-stomp-hooks";
import { MembersChangeMessage } from "../types/WSMessage";

const AuthPage = () => {
  const { setIsAuth, setUserId, setUsername } = useContext(AuthContext);

  const [loginValue, setLoginValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");

  const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
  const [isPasswordsNotMatch, setIsPasswordsNotMatch] = React.useState(false);

  const { colorMode } = useColorMode();

  const handleLogin = () => {
    AuthApi.login({ username: loginValue, password: passwordValue })
      .then((resp) => {
        setIsAuth(true);
        setUsername(resp.data.username);
        setUserId(resp.data.userId);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("username", resp.data.username);
        localStorage.setItem("userId", resp.data.userId.toString());
      })
      .catch(() => setIsInvalidPassword(true));
  };

  const handleRegister = () => {
    if (passwordValue === confirmPasswordValue) {
      AuthApi.register({ username: loginValue, password: passwordValue })
        .then(() => {
          handleLogin();
        })
        .catch(() => setIsInvalidPassword(true));
    } else {
      setIsPasswordsNotMatch(true);
    }
  };

  const alertMessage = (
    isInvalidPassword: boolean,
    isPasswordsNotMatch: boolean
  ) => {
    if (isInvalidPassword) {
      return "Invalid password";
    }

    if (isPasswordsNotMatch) {
      return "Passwords doesn't match";
    }
  };

  const clearPasswordStates = () => {
    setIsInvalidPassword(false);
    setIsPasswordsNotMatch(false);
  };

  return (
    <Box className="AuthPage">
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
      <Box position="absolute" w="100" top="25" left="5">
        {(isInvalidPassword || isPasswordsNotMatch) && (
          <AuthAlert status="error">
            {alertMessage(isInvalidPassword, isPasswordsNotMatch)}
          </AuthAlert>
        )}
      </Box>
      <Flex align="center" justify="center">
        <Box maxW="55%" mt="100">
          <Image
            src={
              colorMode === "dark" ? "./logo-dark.jpeg" : "./logo-white.jpeg"
            }
          />
        </Box>
        <Box pos="absolute" top="500" w="25%" alignItems="center">
          <Box p="1">
            <AuthLoginField
              placeholder="Login"
              size="md"
              field={loginValue}
              setField={setLoginValue}
            />
          </Box>
          <Box p="1">
            <AuthPasswordField
              placeholder="Password"
              isInvalid={isInvalidPassword || isPasswordsNotMatch}
              inputGroupSize="md"
              inputRightPadding="4.5rem"
              rightElementWidth="4.5rem"
              rightElementButtonHeight="1.75rem"
              rightElementButtonSize="sm"
              field={passwordValue}
              setField={setPasswordValue}
            />
          </Box>
          <Box p="1">
            <AuthPasswordField
              placeholder="Password again"
              isInvalid={isInvalidPassword || isPasswordsNotMatch}
              inputGroupSize="md"
              inputRightPadding="4.5rem"
              rightElementWidth="4.5rem"
              rightElementButtonHeight="1.75rem"
              rightElementButtonSize="sm"
              field={confirmPasswordValue}
              setField={setConfirmPasswordValue}
            />
          </Box>
          <Flex align="center" justify="center" p="3">
            <MyButton
              type={"solid"}
              onPushButton={() => {
                clearPasswordStates();
                handleLogin();
              }}
            >
              Login
            </MyButton>
            <MyButton
              type="ghost"
              onPushButton={() => {
                clearPasswordStates();
                handleRegister();
              }}
            >
              Sign up
            </MyButton>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthPage;
