import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store.js';
import AppRouter from './AppRouter';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const rootRoot = createRoot(rootElement);

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <AppRouter />
      </div>
    </PersistGate>
  </Provider>
);

rootRoot.render(<Main />);
