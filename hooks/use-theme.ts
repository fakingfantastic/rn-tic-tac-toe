import { colors } from '@/constants/colors';

export const useTheme = () => {
  return {
    colors: colors,
    light: {
      button: {
        primary: colors.sky400,
      },
      text: {
        primary: colors.neutral700,
      },
    },
  };
};
