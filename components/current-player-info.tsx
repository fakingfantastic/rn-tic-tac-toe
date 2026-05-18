import { Text } from 'react-native';
import { Card } from './card';

export function CurrentPlayerInfo({ currentPlayer }: { currentPlayer: number | null }) {
  if (!currentPlayer) {
    return;
  }

  return (
    <Card>
      <Text
        style={{
          fontFamily: 'Fredoka-SemiBold',
          fontWeight: 600,
          fontSize: 21,
          color: '#CC86D1',
          textAlign: 'center',
        }}
      >
        {currentPlayer === 1 ? "It's Your Turn!" : 'Waiting on Opponent..'}
      </Text>
      <Text
        style={{
          fontFamily: 'Fredoka-SemiBold',
          fontWeight: 600,
          fontSize: 14,
          color: '#606060',
          textAlign: 'center',
        }}
      >
        Player {currentPlayer}
      </Text>
    </Card>
  );
}
