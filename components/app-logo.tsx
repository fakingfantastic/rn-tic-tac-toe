import { useTheme } from '@/hooks/use-theme';
import { Text, View } from 'react-native';

export function AppLogo() {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      <Text style={{ fontFamily: 'Fredoka-Bold', fontSize: 64, color: theme.colors.fuchsia600 }}>
        Tic
      </Text>
      <Text style={{ fontFamily: 'Fredoka-Bold', fontSize: 64, color: theme.colors.fuchsia700 }}>
        Tac
      </Text>
      <Text style={{ fontFamily: 'Fredoka-Bold', fontSize: 64, color: theme.colors.fuchsia600 }}>
        Toe
      </Text>
    </View>
  );
}
