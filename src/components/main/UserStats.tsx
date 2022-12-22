import {
  Box,
  Flex,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { FC } from "react";
import Statistics from "../../types/Statistics";

interface UserStatsProps {
  statistics?: Statistics;
}

const UserStats: FC<UserStatsProps> = (props) => {
  return props.statistics ? (
    <Flex flexDirection="column">
      <Box>
        <Stat>
          <StatLabel>
            <Heading size="md">Played games:</Heading>
          </StatLabel>
          <StatNumber>{props.statistics.playedGamesAmount}</StatNumber>
        </Stat>
      </Box>

      <Box>
        <Stat>
          <StatLabel>
            <StatLabel>
              <Heading size="md">Wins:</Heading>
            </StatLabel>
          </StatLabel>
          <StatNumber>{props.statistics.winsAmount}</StatNumber>
        </Stat>
      </Box>

      <Box>
        <Stat>
          <StatLabel>
            <Heading size="md">Average place:</Heading>
          </StatLabel>
          <StatNumber>{props.statistics.averagePlace}</StatNumber>
        </Stat>
      </Box>

      <Box>
        <Stat>
          <StatLabel>
            <Heading size="md">Last game was:</Heading>
          </StatLabel>
          <StatNumber>{props.statistics.lastGameTimeStamp}</StatNumber>
        </Stat>
      </Box>
    </Flex>
  ) : (
    <Box></Box>
  );
};

export default UserStats;
