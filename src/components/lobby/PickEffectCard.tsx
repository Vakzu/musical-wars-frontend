import { FC, ReactNode, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Stack,
  Heading,
  Text,
  HStack,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import { EffectApi } from "../../API/EffectApi";
import Effect from "../../types/Effect";
import { GiBackstab, GiHighKick, GiHolyGrail, GiLeg } from "react-icons/gi";

interface PickEffectCardProps {
  onPick?: (e: Effect) => void;
  children?: ReactNode;
}

const PickEffectCard: FC<PickEffectCardProps> = ({ onPick, children }) => {
  const [effectsList, setEffectsList] = useState<Effect[]>([]);

  const [currentEffectId, setCurrentEffectId] = useState<number>(0);

  const handleRefresh = () => {
    EffectApi.getUserEffects()
      .then((response) =>
        setEffectsList(response.data.effects ? response.data.effects : [])
      )
      .catch((err) => console.log(err));
  };

  const handlePick = () => {
    if (onPick !== undefined) onPick(currentEffect);
  };

  const handleNext = () => {
    if (currentEffectId + 1 === effectsList.length) {
      setCurrentEffectId(0);
    } else {
      setCurrentEffectId(currentEffectId + 1);
    }
  };

  const currentEffect = effectsList[currentEffectId];

  useEffect(() => {
    handleRefresh();
  }, []);

  if (effectsList.length !== 0) {
    return (
      <Card maxW="md" rounded="md" shadow="md">
        <CardBody>
          <Stack mt="3" spacing="3">
            <Heading size="lg">{currentEffect.name}</Heading>
            <Text fontSize="2xl">
              <HStack spacing="5%">
                <Tooltip
                  hasArrow
                  placement="top"
                  label="Stamina"
                  fontSize="1.3rem"
                >
                  <Stack color="#107896" justify="center" align="center">
                    <Box fontSize="100%">
                      <GiBackstab />
                    </Box>
                    <Box fontSize="100%">{currentEffect.stamina}</Box>
                  </Stack>
                </Tooltip>
                <Tooltip
                  hasArrow
                  placement="top"
                  label="Strength"
                  fontSize="1.3rem"
                >
                  <Stack color="#C02F1D" justify="center" align="center">
                    <Box fontSize="100%">
                      <GiHighKick />
                    </Box>
                    <Box fontSize="100%">{currentEffect.strength}</Box>
                  </Stack>
                </Tooltip>
                <Tooltip
                  hasArrow
                  placement="top"
                  label="Luck"
                  fontSize="1.3rem"
                >
                  <Stack color="orange.500" justify="center" align="center">
                    <Box fontSize="100%">
                      <GiHolyGrail />
                    </Box>
                    <Box fontSize="100%">{currentEffect.luck}</Box>
                  </Stack>
                </Tooltip>
                <Tooltip
                  hasArrow
                  placement="top"
                  label="Constitution"
                  fontSize="1.3rem"
                >
                  <Stack color="green.400" justify="center" align="center">
                    <Box fontSize="100%">
                      <GiLeg />
                    </Box>
                    <Box fontSize="100%">{currentEffect.constitution}</Box>
                  </Stack>
                </Tooltip>
              </HStack>
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={handlePick}>
              Pick
            </Button>
            <Button variant="ghost" colorScheme="blue" onClick={handleNext}>
              Next
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <Card maxW="sm" rounded="md" shadow="md">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Effects not found</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={handleRefresh}>
              Refresh
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }
};

export default PickEffectCard;
