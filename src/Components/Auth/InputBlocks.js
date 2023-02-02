import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";

export default function InputBlocks() {
  return (
    <View>
      <Text
        style={{
          paddingHorizontal: 16,
          paddingVertical: 7,
          borderRadius: 8,
          backgroundColor: COLORS.white,
          fontSize: 24,
          marginHorizontal: 10,
          borderBottomWidth: 1,
        }}
      ></Text>
    </View>
  );
}
