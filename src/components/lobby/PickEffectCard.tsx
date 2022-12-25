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
} from "@chakra-ui/react";
import { EffectApi } from "../../API/EffectApi";
import Effect from "../../types/Effect";
import { GiBackstab, GiHighKick, GiHolyGrail, GiLeg } from "react-icons/gi";

interface PickEffectCardProps {
  onPick?: (e: Effect) => void;
  children?: ReactNode;
}

const PickEffectCard: FC<PickEffectCardProps> = ({onPick, children}) => {
  const [effectsList, setEffectsList] = useState<Effect[]>([]);

  const [currentEffectId, setCurrentEffectId] = useState<number>(0);

  const handleRefresh = () => {
    EffectApi.getAll()
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
            <Text color="blue.600" fontSize="2xl">
              <HStack>
                <Box w="40px" h="40px" color="#107896">
                  <GiBackstab />
                  {currentEffect.stamina}
                </Box>
                <Box w="40px" h="40px" color="#C02F1D">
                  <GiHighKick />
                  {currentEffect.strength}
                </Box>
                <Box w="40px" h="40px" color="orange.500">
                  <GiHolyGrail />
                  {currentEffect.luck}
                </Box>
                <Box w="40px" h="40px" color="green.400">
                  <GiLeg />
                  {currentEffect.constitution}
                </Box>
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
