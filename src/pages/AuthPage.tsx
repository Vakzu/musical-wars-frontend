import React from "react";
import { Box, Fade, Flex, Image, useColorMode } from "@chakra-ui/react";
import AuthPasswordField from "../components/auth/AuthPasswordField";
import AuthLoginField from "../components/auth/AuthLoginField";
import AuthButton, { AuthButtonType } from "../components/auth/AuthButton";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import { AuthApi } from "../API/AuthApi";
import { NavigateFunction, Router, useNavigate } from "react-router-dom";
import AuthAlert from "../components/auth/AuthAlert";

const handleLogin = (
  username: string,
  password: string,
  setInvaludPasswordFunc: (flag: boolean) => void,
  navFuntion: NavigateFunction
) => {
  AuthApi.login({ username, password })
    .then((resp) => navFuntion("/main"))
    .catch((err) => setInvaludPasswordFunc(true));
};

const handleRegister = (
  username: string,
  password: string,
  confirmPassword: string,
  setInvaludPasswordFunc: (flag: boolean) => void,
  setPasswordsNotMatchFunc: (flag: boolean) => void,
  navFuntion: NavigateFunction
) => {
  if (password === confirmPassword) {
    AuthApi.login({ username, password })
      .then((resp) => navFuntion("/main"))
      .catch((err) => setInvaludPasswordFunc(true));
  } else {
    setPasswordsNotMatchFunc(true);
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

const clearPasswordStates = (
  setInvaludPasswordFunc: (flag: boolean) => void,
  setPasswordsNotMatchFunc: (flag: boolean) => void
) => {
  setInvaludPasswordFunc(false);
  setPasswordsNotMatchFunc(false);
};

const AuthPage = () => {
  const [loginValue, setLoginValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");

  const [isInvalidPassword, setIsInvalidPassword] = React.useState(false);
  const [isPasswordsNotMatch, setIsPasswordsNotMatch] = React.useState(false);

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
      {/* <Fade> */}
      <Box
        position="absolute"
        w="100"
        top="25"
        left="5"
      >
        {(isInvalidPassword || isPasswordsNotMatch) && (
          <AuthAlert status="error">
            {alertMessage(isInvalidPassword, isPasswordsNotMatch)}
          </AuthAlert>
        )}
      </Box>
      {/* </Fade> */}
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
            <AuthButton
              type={AuthButtonType.SOLID}
              onPushButton={() => {
                clearPasswordStates(
                  setIsInvalidPassword,
                  setIsPasswordsNotMatch
                );
                handleLogin(
                  loginValue,
                  passwordValue,
                  setIsInvalidPassword,
                  navFunction
                );
              }}
            >
              Login
            </AuthButton>
            <AuthButton
              type={AuthButtonType.GHOST}
              onPushButton={() => {
                clearPasswordStates(
                  setIsInvalidPassword,
                  setIsPasswordsNotMatch
                );
                handleRegister(
                  loginValue,
                  passwordValue,
                  confirmPasswordValue,
                  setIsInvalidPassword,
                  setIsPasswordsNotMatch,
                  navFunction
                );
              }}
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
