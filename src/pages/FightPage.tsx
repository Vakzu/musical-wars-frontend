import { Box, Flex, VStack, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import Carousel, { CarouselItem } from "../components/fight/Carousel";
import FightAnimation from "../components/fight/FightAnimation";
import { FightMovesContext } from "../App";
import { useContext } from "react";

const items: CarouselItem[] = Array(20)
  .fill("")
  .map((_: string, index: number) => ({
    alt: "A random photo",
    image: `https://picsum.photos/${210 + index}`,
    content: (
      <div>
        <strong>Round Carousel</strong>
        <span>Slide number {index + 1}</span>
      </div>
    ),
  }));

const FightPage: FC = () => {
  const { turns } = useContext(FightMovesContext);
  const [info, setInfo] = useState<string>("");

  const { isOpen, onToggle } = useDisclosure();

  const handleClick = () => {
    setSelectedIndexFirst(selectedIndexFirst + 1);
    setSelectedIndexSecond(selectedIndexSecond - 1);
  };

  useEffect(() => {
    handleClick()
  }, []);

  const [selectedIndexFirst, setSelectedIndexFirst] = useState<number>(0);
  const [selectedIndexSecond, setSelectedIndexSecond] = useState<number>(0);

  return (
    <Box className="fightPage">
      <DarkModeSwitch
        aria-label="switch"
        position="absolute"
        top="5"
        right="5"
      />
      <Flex
        position="absolute"
        top="300"
        w="100%"
        align="center"
        justify="center"
      >
        <Box w="40%">
          <Carousel
            items={items}
            selectedIndex={selectedIndexFirst}
            setSelectedIndex={setSelectedIndexFirst}
            itemWidth={200}
          />
        </Box>
        <Box w="20%">
          <VStack>
          <FightAnimation />
          {turns.map((turn) => (
            <Box>
              User {turn.attackerId} damaged {turn.victimId} on {turn.damage}
            </Box>
          ))}
          </VStack>
        </Box>
        <Box w="40%">
          <Carousel
            items={items}
            selectedIndex={selectedIndexSecond}
            setSelectedIndex={setSelectedIndexSecond}
            itemWidth={200}
          />
        </Box>
      </Flex>
      {/* <MyButton onPushButton={handleClick} /> */}
    </Box>
  );
};

export default FightPage;
