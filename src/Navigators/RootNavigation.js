import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { appStackScreens } from "../Constants/appScreens";

export default function RootNavigation() {
  const stack = createStackNavigator();
  return (
    <NavigationContainer independent>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <stack.Screen name="Bottomtab" component={BottomTabNavigator} />
        <stack.Screen
          name={appStackScreens.OrderSuccess.name}
          component={appStackScreens.OrderSuccess.screen}
        />

        <stack.Screen
          name={"CartMain"}
          component={appStackScreens.CartScreen.screen}
        />
        <stack.Screen
          name={appStackScreens.FinalizeOrder.name}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
          component={appStackScreens.FinalizeOrder.screen}
        />
        <stack.Screen
          name={appStackScreens.AddAddress.name}
          component={appStackScreens.AddAddress.screen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
