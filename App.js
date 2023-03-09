import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stack from "./app/Stacks/Stack";

const App = () => {
  return (
    <NavigationContainer>
      <Stack/>
    </NavigationContainer>
  );
};

export default App;