import { Box, Flex, HStack } from "@chakra-ui/react";
import { FC, useContext, useEffect, useState } from "react";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import Hero from "../types/Hero";
import Effect from "../types/Effect";
import EntityCard, { EntityType } from "../components/main/EntityCard";
import { GiBackstab, GiHighKick, GiHolyGrail, GiLeg } from "react-icons/gi";
import { FaDollarSign, FaHeartbeat } from "react-icons/fa";
import UserStats from "../components/main/UserStats";
import Statistics from "../types/Statistics";
import { HeroApi } from "../API/HeroApi";
import { EffectApi } from "../API/EffectApi";
import StartButton from "../components/main/StartButton";
import { StatisticsApi } from "../API/StatisticsApi";
import { LobbyApi } from "../API/LobbyApi";
import { AuthContext } from "../App";

const handleBuyHero = (heroId: number) => {
  HeroApi.buyHero({ heroId });
};

const handleBuyEffect = (effectId: number) => {
  EffectApi.buyEffect({ effectId });
};

const handleNextHero = (
  updateFunc: (heroId: number) => void,
  newHeroId: number
) => {
  updateFunc(newHeroId);
};

const handleNextEffect = (
  updateFunc: (effectId: number) => void,
  newEffectId: number
) => {
  updateFunc(newEffectId);
};

const handleRefreshHeroes = (updateFunc: (heroes: Hero[]) => void) => {
  HeroApi.getAll()
    .then((heroes) => updateFunc(heroes.data.heroes))
    .catch((err) => console.log(err));
};

const handleRefreshEffects = (updateFunc: (effects: Effect[]) => void) => {
  EffectApi.getAll()
    .then((effects) => updateFunc(effects.data.effects))
    .catch((err) => console.log(err));
};

const handleStart = () => {
  LobbyApi.createLobby();
};

interface MainPageProps {}

const MainPage: FC<MainPageProps> = (props) => {
  const { userId, username } = useContext(AuthContext);
  
  const [heroesList, setHeroesList] = useState<Hero[]>([]);
  const [effectsList, setEffectsList] = useState<Effect[]>([]);

  const [currentHeroId, setCurrentHeroId] = useState<number>(0);
  const [currentEffectId, setCurrentEffectId] = useState<number>(0);

  const [statistics, setStatistics] = useState<Statistics>();

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
      .then((response) => {
        setStatistics(response.data.statistics);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className="MainPage">
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
      <Flex position="absolute" align="center" top="130" left="20%">
        <Box w="md" p="2%">
          <EntityCard
            entity={heroesList[currentHeroId]}
            entityType={EntityType.HERO}
            imgSrc={
              heroesList[currentHeroId] !== undefined
                ? heroesList[currentHeroId].imgSrc
                : undefined
            }
            onBuy={
              heroesList[currentEffectId] !== undefined
                ? () => handleBuyHero(heroesList[currentHeroId].id)
                : undefined
            }
            onNext={
              heroesList[currentEffectId] !== undefined
                ? () => {
                    handleNextHero(
                      setCurrentHeroId,
                      currentHeroId + 1 === heroesList.length
                        ? 0
                        : currentHeroId + 1
                    );
                  }
                : undefined
            }
            onRefresh={() => handleRefreshHeroes(setHeroesList)}
          >
            <HStack>
              <Box>
                <FaDollarSign />
                {/* {heroesList[currentHeroId].price} */}
              </Box>
              <Box>
                <FaHeartbeat />
                {/* {heroesList[currentHeroId].health} */}
              </Box>
            </HStack>
          </EntityCard>
        </Box>
        <Box w="md">
          <EntityCard
            entity={effectsList[currentEffectId]}
            entityType={EntityType.EFFECT}
            onBuy={
              effectsList[currentEffectId] !== undefined
                ? () => handleBuyEffect(effectsList[currentEffectId].id)
                : undefined
            }
            onNext={
              effectsList[currentEffectId] !== undefined
                ? () => {
                    handleNextEffect(
                      setCurrentEffectId,
                      currentEffectId + 1 === effectsList.length
                        ? 0
                        : currentEffectId + 1
                    );
                  }
                : undefined
            }
            onRefresh={() => handleRefreshEffects(setEffectsList)}
          >
            {/* ${effectsList[currentEffectId].price} */}
            <HStack>
              <Box w="40px" h="40px" color="#107896">
                <GiBackstab />
                {effectsList[currentEffectId]
                  ? effectsList[currentEffectId].stamina
                  : ""}
              </Box>
              <Box w="40px" h="40px" color="#C02F1D">
                <GiHighKick />
                {effectsList[currentEffectId]
                  ? effectsList[currentEffectId].strength
                  : ""}
              </Box>
              <Box w="40px" h="40px" color="orange.500">
                <GiHolyGrail />
                {effectsList[currentEffectId]
                  ? effectsList[currentEffectId].luck
                  : ""}
              </Box>
              <Box w="40px" h="40px" color="green.400">
                <GiLeg />
                {effectsList[currentEffectId]
                  ? effectsList[currentEffectId].constitution
                  : ""}
              </Box>
            </HStack>
          </EntityCard>
          <Box pos="absolute" top="650" left="40%" w="20%" alignItems="center" p='5'>
            <StartButton onPushButton={() => handleStart()}>START</StartButton>
          </Box>
        </Box>
      </Flex>
      <Box p="5" position="absolute" right="10" top="10" w="200">
        <UserStats statistics={statistics} />
      </Box>
    </Box>
  );
};

export default MainPage;
