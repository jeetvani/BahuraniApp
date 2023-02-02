import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";

export default function HomeScreenLayout({ leftText, rightText, onPress }) {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ fontSize: 14, color: COLORS.black, fontWeight: "600" }}>
          {leftText}
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Text
          onPress={onPress}
          style={{
            fontSize: 14,
            color: COLORS.primary,
            fontWeight: "600",
           
            borderBottomColor: COLORS.primary,
          }}
        >
          {rightText}
        </Text>
      </View>
    </View>
  );
}
