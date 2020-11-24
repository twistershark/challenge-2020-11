import 'react-native-gesture-handler';

import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { MovieProvider } from './hooks/movie';
import Routes from './routes';

const App: React.FC = () => {
  EStyleSheet.build();
  LogBox.ignoreAllLogs();

  return (
    <MovieProvider>
      <StatusBar barStyle="light-content" backgroundColor="#224358" />
      <Routes />
    </MovieProvider>
  );
};

export default App;
