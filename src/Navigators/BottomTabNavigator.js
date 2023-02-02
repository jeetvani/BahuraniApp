import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { bottomTabScreens } from "../Constants/appScreens";
import { COLORS } from "../Constants/res/COLORS";
import BottomTabIcon from "../Components/BottomTabIcon";
export default function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopRightRadius: 19,
          borderTopLeftRadius: 19,
          shadowColor: COLORS.primary,
          elevation: 40,
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.primary,
        },
      }}
      initialRouteName={bottomTabScreens.HomeScreen.name}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon iconName={focused ? "heart" : "heart-outline"} />
          ),
        }}
        name={bottomTabScreens.Wishlist.name}
        component={bottomTabScreens.Wishlist.screen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon iconName={focused ? "grid" : "grid-outline"} />
          ),
        }}
        name={bottomTabScreens.CategoryScreen.name}
        component={bottomTabScreens.CategoryScreen.screen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon iconName={focused ? "home" : "home-outline"} />
          ),
        }}
        name={bottomTabScreens.HomeScreen.name}
        component={bottomTabScreens.HomeScreen.screen}
      />

      <Tab.Screen
        options={{
          
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon iconName={focused ? "person" : "person-outline"} />
          ),
        }}
        name={bottomTabScreens.AccountScreen.name}
        component={bottomTabScreens.AccountScreen.screen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon
              iconName={focused ? "settings" : "settings-outline"}
            />
          ),
        }}
        name={bottomTabScreens.OptionScreen.name}
        component={bottomTabScreens.OptionScreen.screen}
      />
    </Tab.Navigator>
  );
}
