import { StyleSheet, Text, View } from "react-native";

type BoardCellValues = 'x' | 'o'

interface Props {
    value?: BoardCellValues;
    borderBottom?: boolean;
    borderRight?: boolean;
}

const SIZE = 100

const BoardCell = ({value, borderBottom, borderRight}: Props) => {
    const styles = StyleSheet.create({
        cell: {
            height: SIZE,
            width: SIZE,
            alignItems: 'center',
            justifyContent: 'center'
        },
        rightBorder: {
            borderRightWidth: 2,
            borderRightColor: 'black'
        },
        bottomBorder: {
            borderBottomWidth: 2,
            borderBottomColor: 'black'
        }
    })

    return <View style={[styles.cell, borderBottom && styles.bottomBorder, borderRight && styles.rightBorder]}><Text style={{fontSize: 24}}>{value}</Text></View>
}

export { BoardCell, SIZE };
export type { BoardCellValues };
