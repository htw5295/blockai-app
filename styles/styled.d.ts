import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    borderColor: string;
    accent1Color: string;
    header: {
      height: number;
      bgColor: string;
      iconColor: string;
    };
    sidebar: {
      width: number;
      accentColor: string;
    };
    project: {
      tabHeight: number;
      utilHeight: number;
    };
  }
}
