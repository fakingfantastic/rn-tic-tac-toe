import { StyleSheet } from 'react-native';

export const useHomeStyles = () => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 16,
    },
    headerBrowWrapper: { width: '100%', flexDirection: 'row', justifyContent: 'flex-end' },
    boardWrapper: { flex: 1, justifyContent: 'center', gap: 16 },
  });
};
