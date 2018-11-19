import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import styled from '../../themes/styled';
import Router from './Router';
import apolloClient from '../../apollo/client';
import { moodlenet } from '../../themes';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Chrome } from '@zendeskgarden/react-chrome';
import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
// import es from 'react-intl/locale-data/es';
// import fr from 'react-intl/locale-data/fr';
// import it from 'react-intl/locale-data/it';

import '@zendeskgarden/react-chrome/dist/styles.css';
import '@zendeskgarden/react-grid/dist/styles.css';
import '@zendeskgarden/react-buttons/dist/styles.css';
import '@zendeskgarden/react-menus/dist/styles.css';
import '@zendeskgarden/react-avatars/dist/styles.css';
import '@zendeskgarden/react-textfields/dist/styles.css';
import '@zendeskgarden/react-tags/dist/styles.css';
import '@zendeskgarden/react-select/dist/styles.css';
import '@zendeskgarden/react-checkboxes/dist/styles.css';
import '@zendeskgarden/react-pagination/dist/styles.css';
import '@zendeskgarden/react-tabs/dist/styles.css';
import '@zendeskgarden/react-tooltips/dist/styles.css';

import '../../styles/social-icons.css';
import '../../styles/flag-icons.css';
import '../../styles/loader.css';

// TODO lazy load the correct lang file depending on locale
// const localeData = require('../../locales/data.json');
const localeData = {
  en: {}
};

export const AppStyles = styled.div`
  font-family: ${props => props.theme.styles.fontFamily};

  * {
    font-family: ${props => props.theme.styles.fontFamily};
  }
`;

addLocaleData([
  ...en
  // ...es,
  // ...fr,
  // ...it
]);

const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator['userLanguage'];
// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
// Try full locale, try locale without region code, fallback to 'en'
const messages =
  localeData[languageWithoutRegionCode] ||
  localeData[language] ||
  localeData.en;

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={moodlenet}>
          <IntlProvider locale={language} messages={messages}>
            <AppStyles>
              <Chrome>
                <Router />
              </Chrome>
            </AppStyles>
          </IntlProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
