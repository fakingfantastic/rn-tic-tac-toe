import { useMoves } from '@/hooks/use-board-moves';
import { FlatList, View } from 'react-native';
import { BoardCell, BoardCellValues, SIZE } from './board-cell';
interface Props {
  size?: number;
}
const Board = ({ size = 3 }: Props) => {
  const { moves, handlePlayerSelect, boxes } = useMoves({
    size,
  });

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
              onSelect={() => handlePlayerSelect(item.index)}
            />
          );
        }}
        scrollEnabled={false}
      />
    </View>
  );
};

export { Board };
