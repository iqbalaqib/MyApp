import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingListsScreen from '../screens/ShoppingListsScreen';
import ShoppingListDetailScreen from '../screens/ShoppingListDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShoppingLists">
        <Stack.Screen
          name="ShoppingLists"
          component={ShoppingListsScreen}
          options={{ title: "John Doe's Shopping Lists" }}
        />
        <Stack.Screen
          name="ShoppingListDetail"
          component={ShoppingListDetailScreen}
          options={{ title: "Shopping List Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
