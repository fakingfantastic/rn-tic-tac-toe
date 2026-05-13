import { Board } from '@/components/board';
import { useOpponent } from '@/hooks/use-opponent';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPPONENT_ID = 2;

export default function Index() {
  const { moves, handlePlayerSelect, boxes, winner, size } = useTicTacToe({
    size: 3,
  });

  const { makeMove } = useOpponent({
    opponentId: OPPONENT_ID,
    size,
  });

  useEffect(() => {
    if (moves.length && moves.at(-1)?.player != OPPONENT_ID) {
      handlePlayerSelect(makeMove(moves));
    }
  }, [moves]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Winner: {winner}</Text>
      <Board boxes={boxes} onPlayerSelect={handlePlayerSelect} size={size} />
    </SafeAreaView>
  );
}
