import { useTheme } from '@/hooks/use-theme';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Path, Svg } from 'react-native-svg';

type BoardCellValues = 'x' | 'o' | null;

interface Props {
  value?: BoardCellValues;
  borderBottom?: boolean;
  borderRight?: boolean;
  onSelect?: () => void;
  highlight: boolean;
  color: string;
}

const SIZE = 100;

function Mark({ value, color }: Pick<Props, 'value' | 'color'>) {
  if (!value) {
    return;
  }
  if (value === 'x') {
    return (
      <Svg width="71" height="93" viewBox="0 0 71 93">
        <Path
          fill={color}
          d="M69.12 79.872q1.407 2.56 1.152 4.48-.129 1.92-.384 3.2-.384 1.409-1.92 2.432-1.408.896-3.2 1.408-2.304.64-3.84.256-1.92-.384-3.2-1.28-.769-.64-1.408-1.152-.64-.64-1.28-1.152l-1.152-1.152a4 4 0 0 1-.768-1.024q-.255-.512-.512-.64a1.5 1.5 0 0 0-.256-.384L35.328 60.288 18.432 84.864l-.384.384a8 8 0 0 0-.512.64q-.256.512-.768 1.024-.384.511-.896 1.152-.64.511-1.408 1.152a9.2 9.2 0 0 0-1.408 1.152 5.9 5.9 0 0 1-1.664.768l-1.536.512q-1.664.383-3.584-.256-3.969-.895-5.504-3.84a6 6 0 0 1-.64-3.2q.128-1.793.768-3.584a43 43 0 0 1 1.664-3.456q1.023-1.665 2.048-3.2.512-.64.896-1.152.511-.511 1.024-1.152 1.664-2.175 3.2-4.352a260 260 0 0 1 3.328-4.864l11.904-17.28L7.424 19.968l-1.536-2.176a20 20 0 0 0-1.024-1.408 12 12 0 0 1-1.024-1.536 20 20 0 0 1-1.024-1.408 8.8 8.8 0 0 1-.896-1.792 21 21 0 0 0-.768-1.408Q.896 9.471.64 8.448.256 6.912.384 5.632a5.3 5.3 0 0 1 1.664-2.816A4.3 4.3 0 0 1 3.2 1.792q.768-.384 1.408-.768A18 18 0 0 1 6.912.256 9 9 0 0 1 9.088 0q2.304.128 4.352 1.664a20.9 20.9 0 0 1 4.608 4.096 74 74 0 0 0 1.792 2.688q.896 1.152 1.92 2.432l.128.512a133 133 0 0 1 5.76 8.192q2.688 3.84 5.888 8.192.512.64.896 1.28.383.64.896 1.28.512-.64.896-1.28t.896-1.28a625 625 0 0 1 5.632-8.192 870 870 0 0 1 5.888-8.192l.256-.512q1.023-1.28 1.92-2.432a31 31 0 0 0 1.92-2.688 20.9 20.9 0 0 1 4.608-4.096A7.43 7.43 0 0 1 61.696 0q2.048 0 4.352 1.024 1.536.896 2.304 1.792 1.536 1.152 1.92 2.816.128 1.28-.256 2.816a8.8 8.8 0 0 1-.64 1.792q-.256.64-.896 1.408-.768 1.92-1.664 3.2-.512.896-1.024 1.536t-.896 1.408l-1.536 2.176-17.664 25.344L57.6 62.592l6.912 9.728q1.152 1.92 2.304 3.712a76 76 0 0 1 2.304 3.84"
        />
      </Svg>
    );
  } else {
    return (
      <Svg width="81" height="82" viewBox="0 0 81 82">
        <Path
          fill={color}
          d="M22.11 4.95a46.2 46.2 0 0 1 11.385-3.795Q39.435 0 45.21.66q5.94.66 11.385 3.135 5.61 2.475 10.23 6.93 3.795 3.795 6.6 9.24 2.805 5.28 4.125 10.395 2.805 9.075.825 18.315t-6.765 17.16q-2.31 3.63-5.775 6.6a32.7 32.7 0 0 1-7.095 4.62q-4.95 2.31-10.725 3.135-5.775.99-11.22.495-9.9-.495-17.49-4.95Q11.88 71.28 7.26 64.35q-4.455-6.93-5.94-15.675-1.32-8.91 1.155-18.15 2.64-9.9 7.59-16.005Q15.18 8.25 22.11 4.95m4.95 22.11q-2.475 2.31-3.795 5.775t-1.65 7.26q-.33 3.63.495 7.425.99 3.63 2.97 6.6 1.65 2.475 5.94 4.125t8.91 1.98q5.28.33 9.24-2.805 3.96-3.3 5.94-8.085 2.145-4.785 1.98-10.395t-2.97-10.23q-1.98-3.3-5.61-4.785-3.465-1.65-7.425-1.65-3.795-.165-7.59 1.155-3.795 1.155-6.435 3.63"
        />
      </Svg>
    );
  }
}

function BoardCell({ value, borderBottom, borderRight, onSelect, highlight, color }: Props) {
  const theme = useTheme();
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    if (value) {
      animatedValue.value = withSpring(1, { duration: 75 });
    }
  }, [animatedValue, value]);

  const animatedStyles = useAnimatedStyle(() => ({
    position: 'relative',
    opacity: animatedValue.value,
    transform: [
      { rotateZ: `${interpolate(animatedValue.value, [0, 1], [-90, 0])}deg` },
      { scale: interpolate(animatedValue.value, [0, 1], [0.5, 1]) },
    ],
  }));

  const styles = StyleSheet.create({
    cell: {
      height: SIZE,
      width: SIZE,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightBorder: {
      borderRightWidth: 2,
      borderRightColor: theme.colors.purple900,
    },
    bottomBorder: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.purple900,
    },
    cellMark: { fontSize: highlight ? 32 : 24 },
  });

  return (
    <Pressable
      onPress={onSelect}
      disabled={value !== null}
      style={[styles.cell, borderBottom && styles.bottomBorder, borderRight && styles.rightBorder]}
    >
      <Animated.View style={[animatedStyles]}>
        <View style={{ position: 'relative', zIndex: 1 }}>
          <Mark value={value} color={highlight ? 'green' : color} />
        </View>
        <View style={{ position: 'absolute', left: 4, top: 4 }}>
          <Mark value={value} color={'rgba(0,0,0,.1)'} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

export { BoardCell, SIZE };
export type { BoardCellValues };
