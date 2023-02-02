import React from "react";
import { appStackScreens } from "../Constants/appScreens";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

export default function AppStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name={appStackScreens.HomeScreen.name}
        component={appStackScreens.HomeScreen.screen}
      />

      <Stack.Screen
        name={appStackScreens.CartScreen.name}
        component={appStackScreens.CartScreen.screen}
      />
      <Stack.Screen
        name={appStackScreens.AdminUserChat.name}
        component={appStackScreens.AdminUserChat.screen}
      />
      <Stack.Screen
        name={appStackScreens.ProductScreen.name}
        component={appStackScreens.ProductScreen.screen}
      />
      <Stack.Screen
        name={appStackScreens.ProductDetails.name}
        component={appStackScreens.ProductDetails.screen}
      />

      <Stack.Screen
        name={appStackScreens.AllProducts.name}
        component={appStackScreens.AllProducts.screen}
      />
    </Stack.Navigator>
  );
}
