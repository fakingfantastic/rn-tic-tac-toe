import { FlatList, View } from "react-native";
import { BoardCell, BoardCellValues, SIZE } from "./board-cell";
interface Props {
    size?: number
}
const Board = ({size = 3}: Props)  => {
    const data = [...Array<BoardCellValues>(size*size)].map((_,i) => i % size === 0 ? 'x' : 'o')
    return <View style={{height: SIZE * size}}>
        <FlatList<BoardCellValues>
            numColumns={size}
            data={data}
            renderItem={item => {
                const col = item.index % size;
                const row = Math.floor(item.index / size)
                return <BoardCell value={item.item} borderBottom={row < size - 1} borderRight={col < size - 1} />
            }}
            scrollEnabled={false}
            />
    </View>
}

export { Board };
