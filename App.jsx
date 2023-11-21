import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <AppNavigation />
    </>
  );
};

export default App;
