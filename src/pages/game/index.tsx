import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from 'pages/page';
import { PAGES } from '../../shared/constants';
import { SprintGame } from 'features/sprint-game';

const games: Record<string, { title: string }> = {
  audio: {
    title: 'Аудиовызов',
  },
  sprint: {
    title: 'Спринт',
  }
}

export const GamePage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => {
    if (gameId !== undefined && !games[gameId]) {
      navigate('/*', { replace: true });
    }
  }, [gameId, navigate]);

  const title = (gameId && games[gameId]) ? games[gameId].title : '';

  return (
    <Page pageName={PAGES.GAME} title={title}>
      {/* <div>Game: {gameId}</div> */}
      <SprintGame/>
    </Page>
  )
}
