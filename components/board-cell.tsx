import { Pressable, StyleSheet, Text } from 'react-native';

type BoardCellValues = 'x' | 'o' | null;

interface Props {
  value?: BoardCellValues;
  borderBottom?: boolean;
  borderRight?: boolean;
  onSelect?: () => void;
  highlight: boolean;
}

const SIZE = 100;

const BoardCell = ({ value, borderBottom, borderRight, onSelect, highlight }: Props) => {
  const styles = StyleSheet.create({
    cell: {
      height: SIZE,
      width: SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: highlight ? 'green' : 'none',
    },
    rightBorder: {
      borderRightWidth: 2,
      borderRightColor: 'black',
    },
    bottomBorder: {
      borderBottomWidth: 2,
      borderBottomColor: 'black',
    },
    cellMark: { fontSize: highlight ? 32 : 24 },
  });

  return (
    <Pressable
      onPress={onSelect}
      disabled={value !== null}
      style={[styles.cell, borderBottom && styles.bottomBorder, borderRight && styles.rightBorder]}
    >
      <Text style={styles.cellMark}>{value}</Text>
    </Pressable>
  );
};

export { BoardCell, SIZE };
export type { BoardCellValues };
