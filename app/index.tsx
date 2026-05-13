import { Board } from '@/components/board';
import { Button } from '@/components/button';
import { useOpponent } from '@/hooks/use-opponent';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPPONENT_ID = 2;

export default function Index() {
  const { moves, handlePlayerSelect, boxes, winner, size, currentPlayer, restart } = useTicTacToe({
    size: 3,
    players: [1, 2],
  });

  const { makeMove } = useOpponent({
    opponentId: OPPONENT_ID,
    size,
  });

  useEffect(() => {
    if (moves.length && moves.at(-1)?.player != OPPONENT_ID) {
      setTimeout(() => handlePlayerSelect(makeMove(moves)), Math.floor(Math.random() * 3000));
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
      {winner && <Text>Winner: {winner.player}</Text>}
      {!winner && (
        <>
          <Text>Who's Turn: Player {currentPlayer}</Text>
          <Board boxes={boxes} onPlayerSelect={handlePlayerSelect} size={size} />
        </>
      )}
      <Button onPress={restart}>Restart</Button>
    </SafeAreaView>
  );
}
