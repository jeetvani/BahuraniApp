import { View, Text } from "react-native";
import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { authStackScreens } from "../Constants/appScreens";


export default function AuthStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name={authStackScreens.AuthCheck.name}
        component={authStackScreens.AuthCheck.screen}
      />
      <Stack.Screen
        name={authStackScreens.AccountDetails.name}
        component={authStackScreens.AccountDetails.screen}
      />
      <Stack.Screen
        name={authStackScreens.Addresses.name}
        component={authStackScreens.Addresses.screen}
      />
   <Stack.Screen
        name={authStackScreens.Referrals.name}
        component={authStackScreens.Referrals.screen}
      />

      <Stack.Screen
        name={authStackScreens.Orders.name}
        component={authStackScreens.Orders.screen}
      />

      <Stack.Screen
        name={authStackScreens.Coupons.name}
        component={authStackScreens.Coupons.screen}
      />

      <Stack.Screen
        name={authStackScreens.PhoneInput.name}
        component={authStackScreens.PhoneInput.screen}
      />
      <Stack.Screen
        name={authStackScreens.OTPInput.name}
        component={authStackScreens.OTPInput.screen}
      />

<Stack.Screen
        name={authStackScreens.EditProfile.name}
        component={authStackScreens.EditProfile.screen}
      />
      <Stack.Screen
        name={authStackScreens.UserRegistrationForm.name}
        component={authStackScreens.UserRegistrationForm.screen}
      />
    </Stack.Navigator>
  );
}
