import { PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';

const Button = ({ children, onPress }: PropsWithChildren<{ onPress: () => void }>) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: 'hsla(0, 0%, 90%, 1.0)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.25)',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Text>{children}</Text>
      </View>
    </Pressable>
  );
};

export { Button };
