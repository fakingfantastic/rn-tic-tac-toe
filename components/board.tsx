import { Move } from '@/hooks/use-tic-tac-toe';
import { FlatList, View } from 'react-native';
import { BoardCell, BoardCellValues, SIZE } from './board-cell';

const CURRENT_USER_ID = 1;

interface Props {
  size?: number;
  boxes: BoardCellValues[];
  onPlayerSelect: (move: Omit<Move, 'value'>) => void;
  highlightedCells: Move[] | null;
}

const Board = ({ size = 3, boxes, onPlayerSelect, highlightedCells }: Props) => {
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
              color={item?.item === 'x' ? '#CC86D1' : '#DCFFBD'}
              highlight={
                highlightedCells && highlightedCells.map(x => x.location).includes(item.index)
              }
              onSelect={() =>
                onPlayerSelect({
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
