import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import checkAuth from "../../functions/checkAuth";
import { COLORS } from "../../Constants/res/COLORS";
import { useNavigation } from "@react-navigation/native";
import { authStackScreens } from "../../Constants/appScreens";

export default function AuthCheck() {
  const [isLoading, setisLoading] = useState(true)
  const navigation = useNavigation();
  const mainFunction = () => {
    checkAuth().then((res) => {
      console.log(res);
      if (res) {
        // navigate to account details
        navigation.navigate(authStackScreens.AccountDetails.name);
      } else {
        // navigate to phone input
        navigation.navigate("PhoneInput1");
      }
    });
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      mainFunction();
    });
    
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <ActivityIndicator size={30} color={COLORS.primary} animating />
    </View>
  );
}
