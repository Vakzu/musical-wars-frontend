import { Alert, AlertIcon } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface AuthAlertFieldProps {
  children: ReactNode;
  status: any;
}

const AuthAlert: FC<AuthAlertFieldProps> = (props) => {
  return (
    <Alert status={props.status} rounded="md" shadow="md">
      <AlertIcon />
      {props.children}
    </Alert>
  );
};

export default AuthAlert;
