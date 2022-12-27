import {
  Box,
  Center,
  Flex,
  Stat,
  Text,
  Image,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { DarkModeSwitch } from "../components/utility/DarkModeSwitch";
import Carousel, { CarouselItem } from "../components/fight/Carousel";
import MyButton from "../components/utility/MyButton";
import { ArrowDownIcon, ChevronDownIcon } from "@chakra-ui/icons";
import FightAnimation from "../components/fight/FightAnimation";
import { useSubscription } from "react-stomp-hooks";

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
  const handleClick = () => {
    setSelectedIndexFirst(selectedIndexFirst + 1);
    setSelectedIndexSecond(selectedIndexSecond - 1);
  };

  const [selectedIndexFirst, setSelectedIndexFirst] = useState<number>(0);
  const [selectedIndexSecond, setSelectedIndexSecond] = useState<number>(0);

  const renderFightMove = () => {};

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
          <FightAnimation />
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
      <MyButton onPushButton={handleClick} />
    </Box>
  );
};

export default FightPage;
