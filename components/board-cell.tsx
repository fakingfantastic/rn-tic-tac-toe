import { Pressable, StyleSheet, Text } from 'react-native';

type BoardCellValues = 'x' | 'o' | null;

interface Props {
  value?: BoardCellValues;
  borderBottom?: boolean;
  borderRight?: boolean;
  onSelect?: () => void;
}

const SIZE = 100;

const BoardCell = ({ value, borderBottom, borderRight, onSelect }: Props) => {
  const styles = StyleSheet.create({
    cell: {
      height: SIZE,
      width: SIZE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightBorder: {
      borderRightWidth: 2,
      borderRightColor: 'black',
    },
    bottomBorder: {
      borderBottomWidth: 2,
      borderBottomColor: 'black',
    },
  });

  return (
    <Pressable
      onPress={onSelect}
      style={[styles.cell, borderBottom && styles.bottomBorder, borderRight && styles.rightBorder]}
    >
      <Text style={{ fontSize: 24 }}>{value}</Text>
    </Pressable>
  );
};

export { BoardCell, SIZE };
export type { BoardCellValues };
