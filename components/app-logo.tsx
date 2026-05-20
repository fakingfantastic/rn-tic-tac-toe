import { useTheme } from '@/hooks/use-theme';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function AppLogo() {
  const animatedTic = useSharedValue(0);
  const animatedTac = useSharedValue(0);
  const animatedToe = useSharedValue(0);

  useEffect(() => {
    animatedTic.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.ease,
      }),
      -1,
      true,
    );

    animatedTac.value = withRepeat(
      withTiming(1, {
        duration: 1400,
        easing: Easing.linear,
      }),
      -1,
      true,
    );

    animatedToe.value = withRepeat(
      withTiming(1, {
        duration: 1400,
        easing: Easing.ease,
      }),
      -1,
      true,
    );

    return () => {
      cancelAnimation(animatedTic);
      cancelAnimation(animatedTac);
      cancelAnimation(animatedToe);
    };
  }, [animatedTic, animatedTac, animatedToe]);

  const animatedStyleTic = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(animatedTic.value, [0, 1], [-5, 5]) }],
  }));
  const animatedStyleTac = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(animatedTac.value, [0, 1], [-5, 5]) }],
  }));
  const animatedStyleToe = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(animatedToe.value, [0, 1], [-5, 5]) }],
  }));
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      <Animated.Text
        style={[
          { fontFamily: 'Fredoka-Bold', fontSize: 64, color: theme.colors.fuchsia600 },
          animatedStyleTic,
        ]}
      >
        Tic
      </Animated.Text>
      <Animated.Text
        style={[
          { fontFamily: 'Fredoka-Bold', fontSize: 64, color: theme.colors.fuchsia400 },
          animatedStyleTac,
        ]}
      >
        Tac
      </Animated.Text>
      <Animated.Text
        style={[
          { fontFamily: 'Fredoka-Bold', fontSize: 64, color: theme.colors.fuchsia600 },
          animatedStyleToe,
        ]}
      >
        Toe
      </Animated.Text>
    </View>
  );
}
