import { colors } from '@/constants/colors';

export const useTheme = () => {
  return {
    colors: colors,
    light: {
      backgroundGradient: {
        start: '#DCFFBD',
        end: '#CC86D1',
      },
      button: {
        primary: colors.sky400,
      },
      text: {
        primary: colors.neutral700,
      },
    },
  };
};
