import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export function Card({ children }: PropsWithChildren) {
  return (
    <View style={{ width: '100%', backgroundColor: 'white', padding: 16, borderRadius: 64 }}>
      {children}
    </View>
  );
}
