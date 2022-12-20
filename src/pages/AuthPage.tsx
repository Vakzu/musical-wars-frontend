import React from "react";
import { Box, Flex, Image, useColorMode } from "@chakra-ui/react";
import AuthPasswordField from "../components/auth/AuthPasswordField";
import AuthLoginField from "../components/auth/AuthLoginField";
import AuthButton, { AuthButtonType } from "../components/auth/AuthButton";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import { AuthApi } from "../API/AuthApi";
import { NavigateFunction, Router, useNavigate } from "react-router-dom";

const handleLogin = (
  username: string,
  password: string,
  navFuntion: NavigateFunction
) => {
  AuthApi.login({ username, password })
    .then((resp) => {
      console.log(resp.status);
      navFuntion("/main");
    })
    .catch((err) => console.log(err));
};

const AuthPage = () => {
  const [loginValue, setLoginValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");

  const { colorMode, toggleColorMode } = useColorMode();

  const navFunction = useNavigate();

  return (
    <Box className="AuthPage">
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
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
              inputSize="md"
              field={loginValue}
              setField={setLoginValue}
            />
          </Box>
          <Box p="1">
            <AuthPasswordField
              placeholder="Password"
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
            <AuthButton
              type={AuthButtonType.SOLID}
              onPushButton={() => handleLogin(loginValue, passwordValue, navFunction)}
            >
              Login
            </AuthButton>
            <AuthButton
              type={AuthButtonType.GHOST}
              onPushButton={() => handleLogin(loginValue, passwordValue, navFunction)}
            >
              Sign up
            </AuthButton>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthPage;
