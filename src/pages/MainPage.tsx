import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import Hero from "../types/Hero";
import Effect from "../types/Effect";
import EntityCard from "../components/main/EntityCard";
import { GiBackstab, GiHighKick, GiHolyGrail, GiLeg } from "react-icons/gi";
import { FaDollarSign, FaHeartbeat } from "react-icons/fa";
import UserStats from "../components/main/UserStats";
import Statistics from "../types/Statistics";
import { HeroApi } from "../API/HeroApi";
import { EffectApi } from "../API/EffectApi";
import StartButton from "../components/main/StartButton";
import { StatisticsApi } from "../API/StatisticsApi";
import { LobbyApi } from "../API/LobbyApi";
import { AuthContext, LobbyContext } from "../App";
import { StatsButton } from "../components/main/StatsButton";

const MainPage: FC = () => {
  const { username } = useContext(AuthContext);
  const { setLobbyId } = useContext(LobbyContext);

  const [heroesList, setHeroesList] = useState<Hero[]>([]);
  const [effectsList, setEffectsList] = useState<Effect[]>([]);

  const [currentHeroId, setCurrentHeroId] = useState<number>(0);
  const [currentEffectId, setCurrentEffectId] = useState<number>(0);

  const { isOpen, onToggle } = useDisclosure();
  const [statistics, setStatistics] = useState<Statistics | undefined>();

  const handleBuyHero = () => {
    HeroApi.buyHero({ heroId: currentHeroId });
  };

  const handleBuyEffect = () => {
    EffectApi.buyEffect({ effectId: currentEffectId });
  };

  const handleNextHero = () => {
    if (currentHeroId + 1 === heroesList.length) {
      setCurrentHeroId(0);
    } else {
      setCurrentHeroId(currentHeroId + 1);
    }
  };

  const handleNextEffect = () => {
    if (currentEffectId + 1 === effectsList.length) {
      setCurrentEffectId(0);
    } else {
      setCurrentEffectId(currentEffectId + 1);
    }
  };

  const handleRefreshHeroes = () => {
    console.log("Resfresh");
    HeroApi.getAll()
      .then((response) => setHeroesList(response.data.heroes))
      .catch((err) => console.log(err));
  };

  const handleRefreshEffects = () => {
    EffectApi.getAll()
      .then((response) => setEffectsList(response.data.effects))
      .catch((err) => console.log(err));
  };

  const handleStart = () => {
    LobbyApi.createLobby()
      .then((response) => setLobbyId(response.data.lobbyId))
      .catch((err) => console.log(err));
    // LobbySocket.connect();
  };

  const renderHeroCard = (): ReactNode => {
    if (heroesList[currentHeroId]) {
      return (
        <EntityCard
          entity={heroesList[currentHeroId]}
          imgSrc={heroesList[currentHeroId]?.imgSrc}
          onBuy={handleBuyHero}
          onNext={handleNextHero}
          onRefresh={handleRefreshHeroes}
          defaultText="Heroes not found"
        >
          <HStack>
            <Box>
              <FaDollarSign />
              {heroesList[currentHeroId]?.price}
            </Box>
            <Box>
              <FaHeartbeat />
              {heroesList[currentHeroId]?.health}
            </Box>
          </HStack>
        </EntityCard>
      );
    } else {
      return (
        <EntityCard
          onRefresh={handleRefreshHeroes}
          defaultText="Heroes not found"
        />
      );
    }
  };

  const renderEffectCard = (): ReactNode => {
    if (effectsList[currentEffectId]) {
      return (
        <EntityCard
          entity={effectsList[currentEffectId]}
          onBuy={handleBuyEffect}
          onNext={handleNextEffect}
          onRefresh={handleRefreshEffects}
          defaultText="Effects not found"
        >
          <HStack>
            <Box w="40px" h="40px" color="#107896">
              <GiBackstab />
              {effectsList[currentEffectId]?.stamina}
            </Box>
            <Box w="40px" h="40px" color="#C02F1D">
              <GiHighKick />
              {effectsList[currentEffectId]?.strength}
            </Box>
            <Box w="40px" h="40px" color="orange.500">
              <GiHolyGrail />
              {effectsList[currentEffectId]?.luck}
            </Box>
            <Box w="40px" h="40px" color="green.400">
              <GiLeg />
              {effectsList[currentEffectId]?.constitution}
            </Box>
          </HStack>
        </EntityCard>
      );
    } else {
      return (
        <EntityCard
          onRefresh={handleRefreshEffects}
          defaultText="Effects not found"
        />
      );
    }
  };

  useEffect(() => {
    HeroApi.getAll()
      .then((response) => {
        setHeroesList(response.data.heroes);
        setCurrentHeroId(0);
      })
      .catch((err) => console.log(err));

    EffectApi.getAll()
      .then((response) => {
        setEffectsList(response.data.effects);
        setCurrentEffectId(0);
      })
      .catch((err) => console.log(err));

    StatisticsApi.getStats()
      .then((response) => setStatistics(response.data?.statistics))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className="MainPage">
      <Flex
        position="absolute"
        left="5"
        align="center"
        // justify="center"
        w="lg"
      >
        <Avatar bg="teal.500" />
        <Heading p="3%">Hello, {username ? username : "somebody"}</Heading>
      </Flex>
      <StatsButton
        aria-label="switch"
        position="absolute"
        top="5"
        right="20"
        onClick={onToggle}
      />
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
      <VStack
        position="absolute"
        align="center"
        justify="center"
        top="130"
        left="20%"
      >
        <Flex>
          <Box w="md" p="2%">
            {renderHeroCard()}
          </Box>
          <Box w="md" p="2%">
            {renderEffectCard()}
          </Box>
        </Flex>
        <Box top="650" left="40%" w="20%" alignItems="center" p="5">
          <StartButton onPushButton={() => handleStart()}>START</StartButton>
        </Box>
      </VStack>
      <Box position="absolute" right="1" top="20">
        <UserStats isOpen={isOpen} statistics={statistics} />
      </Box>
    </Box>
  );
};

export default MainPage;
