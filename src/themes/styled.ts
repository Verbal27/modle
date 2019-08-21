import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

export interface MoodleThemeInterface {
  // rebass
  buttons: {
    primary: {
      backgroundColor: string;
      color: string;
      borderRadius: string;
    };
    outline: {
      color: string;
      borderColor: string;
      backgroundColor: string;
      borderRadius: string;
    };
  };
  breakpoints: string[];
  fontSizes: number[];
  colors: {
    orange: string;
    black: string;
    gray: string;
    lightgray: string;
    lighter: string
    darkgray: string
  };
  space: number[];
  fonts: {
    sans: string;
  };

  colour: {
    background: string;
    secondaryBg: string;
    header: string;
    headerLink: string;
    breadcrumb: string;
    divider: string;
    // Community
    communityBg: string;
    communityTitle: string;
    communityNote: string;
    communityIcon: string;
    newcommunityBgHover: string;
    newcommunityBg: string;

    // Feed
    feedBg: string;
    feedText: string;
    // Collection
    collectionBg: string;
    collectionTitle: string;
    collectionNote: string;
    collectionIcon: string;
    collectionHover: string;

    // Resource element
    resourceBg: string;
    resourceTitle: string;
    resourceNote: string;
    resourceIcon: string;

    // Hero
    hero: string;
    heroTitle: string;
    heroNote: string;
    heroIcon: string;

    // Hero Collection
    heroCollection: string;
    heroCollectionTitle: string;
    heroCollectionNote: string;
    heroCollectionIcon: string;

    logo: string;
    primary: string;
    primaryAlt: string;
    secondary: string;
    primaryDark: string;
    base1: string;
    base2: string;
    base3: string;
    base4: string;
    base5: string;
    base6: string;
    blue1: string;
    blue2: string;
    blue3: string;
    green1: string;
    green2: string;
    green3: string;
  };
  fontFamily: string;
  fontWeight: {
    light: number;
    regular: number;
    semibold: number;
    bold: number;
  };
  fontSize: {
    xxxl: string;
    xxl: string;
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
  };
  lineHeight: {
    xxxl: string;
    xxl: string;
    xl: string;
    lg: string;
    md: string;
    sm: string;
    xs: string;
  };
}

// MoodleNet theme interface, defines the shape of a theme definition
export interface ThemeInterface {
  // There is a "styles" parent property on the interface because
  // we are using Zendesk Garden which provides its own ThemeProvider,
  // which places the consumer theme at `props.theme.styles` instead
  // of the styled-components' usual `props.theme`.
  // https://garden.zendesk.com/react-components/theming/#themeprovider
  styles: MoodleThemeInterface;
}

export interface StyledThemeInterface {
  theme: ThemeInterface;
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };

export default styled;
