import { StyleSheet } from 'react-native';

export const useGameOverModalStyles = () => {
  return StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      margin: 20,
      backgroundColor: 'rgba(255,255,255,.95)',
      borderRadius: 20,
      borderWidth: 3,
      borderColor: 'white',
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalCloseButton: { position: 'absolute', top: 16, right: 16, opacity: 0.5 },
  });
};
