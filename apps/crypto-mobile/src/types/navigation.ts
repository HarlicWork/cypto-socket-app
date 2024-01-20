import type { StackScreenProps } from '@react-navigation/stack';

export const enum AppRouteNames {
  Home = 'Home',
}

export type ApplicationStackParamList = {
  Home: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
