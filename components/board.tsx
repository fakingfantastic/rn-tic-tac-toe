import { useOpponent } from '@/hooks/use-opponent';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { BoardCell, BoardCellValues, SIZE } from './board-cell';
interface Props {
  size?: number;
}

const CURRENT_USER_ID = 1;
const OPPONENT_ID = 2;

const Board = ({ size = 3 }: Props) => {
  const { moves, handlePlayerSelect, boxes, winner } = useTicTacToe({
    size,
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
    <View style={{ height: SIZE * size }}>
      <Text>Winner: {winner}</Text>
      <FlatList<BoardCellValues>
        numColumns={size}
        data={boxes}
        renderItem={item => {
          const col = item.index % size;
          const row = Math.floor(item.index / size);
          return (
            <BoardCell
              value={item.item}
              borderBottom={row < size - 1}
              borderRight={col < size - 1}
              onSelect={() =>
                handlePlayerSelect({
                  player: CURRENT_USER_ID,
                  location: item.index,
                })
              }
            />
          );
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export { Board };
