import { AppLogo } from '@/components/app-logo';
import { Board } from '@/components/board';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { useOpponent } from '@/hooks/use-opponent';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPPONENT_ID = 2;

export default function Index() {
  const { moves, handlePlayerSelect, boxes, winner, size, currentPlayer, restart, isGameOver } =
    useTicTacToe({
      size: 3,
      players: [1, 2],
    });

  const { makeMove } = useOpponent({
    opponentId: OPPONENT_ID,
    size,
  });

  useEffect(() => {
    if (moves.length && moves.at(-1)?.player != OPPONENT_ID) {
      setTimeout(() => handlePlayerSelect(makeMove(moves)), Math.floor(Math.random() * 2000));
    }
  }, [moves]);

  return (
    <LinearGradient colors={['#DCFFBD', '#CC86D1']} style={{ flex: 1 }} start={[0, 0]} end={[1, 1]}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          gap: 16,
        }}
      >
        <AppLogo />
        {isGameOver && (
          <View>
            <Text>Game Over! {isGameOver ? 'yes' : 'no'}</Text>
            <Text>{winner ? `Winner: ${winner.player}` : 'No Winner'}</Text>
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Board
            boxes={boxes}
            onPlayerSelect={handlePlayerSelect}
            size={size}
            highlightedCells={winner?.moves}
          />
        </View>
        <Card>
          <Text
            style={{
              fontFamily: 'Fredoka-SemiBold',
              fontWeight: 600,
              fontSize: 21,
              textAlign: 'center',
            }}
          >
            Who's Turn: Player {currentPlayer}
          </Text>
        </Card>
        <Button onPress={restart}>Restart</Button>
      </SafeAreaView>
    </LinearGradient>
  );
}
