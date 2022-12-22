import { Box, Flex, HStack, effect } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import Hero from "../types/Hero";
import Effect from "../types/Effect";
import EntityCard from "../components/main/EntityCard";
import { GiBackstab, GiHighKick, GiHolyGrail, GiLeg } from "react-icons/gi";
import UserStats from "../components/main/UserStats";
import Statistics from "../types/Statistics";
import { HeroApi } from "../API/HeroApi";
import { EffectApi } from "../API/EffectApi";
import { StatisticsApi } from "../API/StatisticsApi";

/*
1) Сделать перелистывание карточек
2) Кнопку старт
3) Запрогать функционал а не мокать
4) Прикрутить обновление если не загрузили
*/

const handleBuyHero = (userId: string, heroId: number) => {
  HeroApi.buyHero({ userId, heroId });
};

const handleBuyEffect = (userId: string, effectId: number) => {
  EffectApi.buyEffect({ userId, effectId });
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

interface MainPageProps {}

const MainPage: FC<MainPageProps> = (props) => {
  const [heroesList, setHeroesList] = useState<Hero[]>([]);
  const [effectsList, setEffectsList] = useState<Effect[]>([]);

  const [currentHeroId, setCurrentHeroId] = useState<number>(0);
  const [currentEffectId, setCurrentEffectId] = useState<number>(0);

  const [statistics, setStatistics] = useState<Statistics>();

  const userId: string = "5";
//   const currentHero = heroesList[currentHeroId];

  //   const currentHeroExample: Hero = {
  //     id: 1,
  //     name: "katya",
  //     price: "500",
  //     imgSrc:
  //       "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Dora_%282020-12-22%29.jpg/1200px-Dora_%282020-12-22%29.jpg",
  //   };

  //   const currentEffect: Effect = {
  //     id: 1,
  //     name: "Oh my god",
  //     price: "500",
  //     stamina: 20,
  //     strength: 30,
  //     luck: 40,
  //     constitution: 50,
  //   };

  //   const statistics: Statistics = {
  //     playedGamesAmount: 5,
  //     winsAmount: 5,
  //     averagePlace: "0.5",
  //     lastGameTimeStamp: "10.01.2002",
  //   };

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

      StatisticsApi.getStats({userId}).then((response) => {
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
            imgSrc={
              heroesList[currentHeroId] != undefined
                ? heroesList[currentHeroId].imgSrc
                : undefined
            }
            onBuy={
              heroesList[currentEffectId] != undefined
                ? () => handleBuyHero(userId, heroesList[currentHeroId].id)
                : undefined
            }
            onNext={
              heroesList[currentEffectId] != undefined
                ? () => {
                    handleNextHero(
                      setCurrentHeroId,
                      currentHeroId + 1 == heroesList.length
                        ? 0
                        : currentHeroId + 1
                    );
                  }
                : undefined
            }
            onRefresh={() => handleRefreshHeroes(setHeroesList)}
          >
            {/* ${heroesList[currentEffectId].price} */}
          </EntityCard>
        </Box>
        <Box w="md">
          <EntityCard
            entity={effectsList[currentEffectId]}
            onBuy={
              effectsList[currentEffectId] != undefined
                ? () => handleBuyEffect(userId, effectsList[currentEffectId].id)
                : undefined
            }
            onNext={
              effectsList[currentEffectId] != undefined
                ? () => {
                    handleNextEffect(
                      setCurrentEffectId,
                      currentEffectId + 1 == effectsList.length
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
                {effectsList[currentEffectId] ? effectsList[currentEffectId].stamina : ''}
              </Box>
              <Box w="40px" h="40px" color="#C02F1D">
                <GiHighKick />
                {effectsList[currentEffectId] ? effectsList[currentEffectId].strength : ''}
              </Box>
              <Box w="40px" h="40px" color="orange.500">
                <GiHolyGrail />
                {effectsList[currentEffectId] ? effectsList[currentEffectId].luck : ''}
              </Box>
              <Box w="40px" h="40px" color="green.400">
                <GiLeg />
                {effectsList[currentEffectId] ? effectsList[currentEffectId].constitution : ''}
              </Box>
            </HStack>
          </EntityCard>
        </Box>
      </Flex>
      <Box p="5" position="absolute" right="10" top="10" w="200">
        <UserStats statistics={statistics} />
      </Box>
    </Box>
  );
};

export default MainPage;
