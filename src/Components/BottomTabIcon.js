import { View, Text } from "react-native";
import React from "react";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../Constants/res/COLORS";
export default function BottomTabIcon({ iconName }) {
  return (
    <View>
      <Text>
        <Ionicons name={iconName} size={23} color={COLORS.primary} />
      </Text>
    </View>
  );
}
