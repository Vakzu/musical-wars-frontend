import { Alert, AlertIcon, AlertProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface AuthAlertFieldProps {
  children: ReactNode;
}

const AuthAlert: FC<AuthAlertFieldProps & AlertProps> = ({
  children,
  ...props
}) => {
  return (
    <Alert {...props} rounded="md" shadow="md">
      <AlertIcon />
      {children}
    </Alert>
  );
};

export default AuthAlert;
