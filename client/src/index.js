import React from 'react';
import ReactDOM from 'react-dom';

import CustomLink from './components/CustomLink';

// React Context
import { StoreProvider } from './context/StoreContext';

// Shopify Polaris
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import App from './App';

ReactDOM.render(
  <AppProvider i18n={enTranslations} linkComponent={CustomLink}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </AppProvider>,
  document.getElementById('root')
);
