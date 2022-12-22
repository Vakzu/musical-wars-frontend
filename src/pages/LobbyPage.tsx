import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import Section from '../components/lobby/LobbySection';
import LobbySection from '../components/lobby/LobbySection';

interface LobbyPageProps {}

/*
1) Отрефакторить компонент EntityCard
2) Отрефакторить компонент кнопки

*/

const LobbyPage: FC<LobbyPageProps> = (props) => {
    return (
        <Box className='LobbyPage'>
            <LobbySection sectionName='ONLINE'>
                ''
            </LobbySection>
        </Box>
    )
}

export default LobbyPage;