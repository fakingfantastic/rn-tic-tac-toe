import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

export function PointsChip({ points }: { points: number }) {
  return (
    <LinearGradient
      colors={['#CC86D1', '#7f7fd5']}
      start={[0, 0.25]}
      end={[1, 0]}
      style={{
        borderRadius: 64,
        paddingVertical: 8,
        paddingHorizontal: 12,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Svg width="21" height="21" viewBox="0 0 200 200">
          <Path
            fill="#c0f0f0"
            d="m169 170.71-2-4a73.8 73.8 0 0 0-31-32 66.14 66.14 0 0 0 29-54.5 65 65 0 1 0-101 54 73.8 73.8 0 0 0-31 32l-2 4a10.06 10.06 0 0 0 18 9l2-4a55 55 0 0 1 98 0l2 4a10 10 0 0 0 13.5 4.5c5-2 7-8 4.5-13M55 80.21a45 45 0 1 1 45 45 44.81 44.81 0 0 1-45-45"
          />
        </Svg>
        <Text
          style={{ color: '#c0f0f0', fontFamily: 'Fedorka-Bold', fontWeight: 700, fontSize: 16 }}
        >
          {points}
        </Text>
      </View>
    </LinearGradient>
  );
}
