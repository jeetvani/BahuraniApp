import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { appStackScreens, authStackScreens } from "../Constants/appScreens";
import BannerZoom from "../screens/AppScreens/BannerZoom";
import OTPInput from "../screens/Profile/OTPInput";

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
        <stack.Screen name="Bottomtab" component={OTPInput} />
        <stack.Screen
          name={appStackScreens.OrderSuccess.name}
          component={appStackScreens.OrderSuccess.screen}
        />

        <stack.Screen
          name={"CartMain"}
          component={appStackScreens.CartScreen.screen}
        />
           <stack.Screen
          name={"BannerZoom"}
          component={BannerZoom}
        />
          <stack.Screen
        name={appStackScreens.NotificationSettings.name}
        component={appStackScreens.NotificationSettings.screen}
      />
    
    <stack.Screen
        name={appStackScreens.Policies.name}
        component={appStackScreens.Policies.screen}
      />
        <stack.Screen
          name={"PhoneInput1"}
          component={authStackScreens.PhoneInput.screen}
        />
        <stack.Screen
          name={"OTPInput1"}
          component={authStackScreens.OTPInput.screen}
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
