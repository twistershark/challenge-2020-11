import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Routes from './routes';

const App: React.FC = () => {
  EStyleSheet.build();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#224358" />
      <Routes />
    </>
  );
};

export default App;
