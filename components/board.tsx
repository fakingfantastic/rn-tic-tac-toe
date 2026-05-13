import { useMoves } from '@/hooks/use-board-moves';
import { useOpponent } from '@/hooks/use-opponent';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { BoardCell, BoardCellValues, SIZE } from './board-cell';
interface Props {
  size?: number;
}
const Board = ({ size = 3 }: Props) => {
  const OPPONENT_ID = 2;
  const { moves, handlePlayerSelect, boxes } = useMoves({
    size,
  });

  const { makeMove } = useOpponent({
    opponentId: OPPONENT_ID,
    size,
  });

  useEffect(() => {
    if (moves.length && moves.at(-1)?.player != OPPONENT_ID) {
      handlePlayerSelect({ ...makeMove(moves) });
    }
  }, [moves]);

  return (
    <View style={{ height: SIZE * size }}>
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
                  player: 1,
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
