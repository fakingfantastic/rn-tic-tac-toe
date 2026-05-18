import { useTheme } from '@/hooks/use-theme';
import { PropsWithChildren } from 'react';
import { Pressable, View } from 'react-native';

const Button = ({ children, onPress }: PropsWithChildren<{ onPress: () => void }>) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 24,
        backgroundColor: theme.light.button.primary,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>{children}</View>
    </Pressable>
  );
};

export { Button };
