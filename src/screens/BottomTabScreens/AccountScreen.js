import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthStack from "../../Navigators/AuthStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authStackScreens } from "../../Constants/appScreens";

export default function AccountScreen() {
  const navigation = useNavigation();

  return <AuthStack />;
}
