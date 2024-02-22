// types/react-native-stars.d.ts
declare module 'react-native-stars' {
  import { ComponentType } from 'react';
  import { ViewStyle } from 'react-native';

  interface StarsProps {
    default?: number;
    count?: number;
    half?: boolean;
    fullStar?: JSX.Element;
    emptyStar?: JSX.Element;
    halfStar?: JSX.Element;
    disabled?: boolean;
    starSize?: number;
    update?: (val: number) => void;
    spacing?: number;
    starStyle?: ViewStyle;
  }

  const Stars: ComponentType<StarsProps>;
  export default Stars;
}
