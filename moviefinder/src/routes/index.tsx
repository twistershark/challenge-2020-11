import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Dashboard from '../pages/Dashboard';
import MovieDetail from '../pages/MovieDetail';
import Favorites from '../pages/Favorites';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <App.Navigator initialRouteName="Dashboard">
      <App.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <App.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerShown: false,
        }}
      />

      <App.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
        }}
      />
    </App.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
