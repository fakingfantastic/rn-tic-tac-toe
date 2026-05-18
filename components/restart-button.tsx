import { useTheme } from '@/hooks/use-theme';
import { Pressable, Text } from 'react-native';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export function RestartButton({ onPress }: { onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}
    >
      <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <G
          stroke={theme.colors.purple900}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          clip-path="url(#a)"
        >
          <Path d="M12 3a9 9 0 1 1-5.657 2" />
          <Path d="M3 4.5h4v4" />
        </G>
        <Defs>
          <ClipPath id="a">
            <Path fill="#fff" d="M0 0h24v24H0z" />
          </ClipPath>
        </Defs>
      </Svg>
      <Text style={{ color: theme.colors.purple900, fontWeight: 'bold' }}>Restart</Text>
    </Pressable>
  );
}
