import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";

export default function CategoryCard({ img, title }) {
  return (
    <View
      style={{
        marginHorizontal: 5,

        width: 135,
        padding: 15,

        alignItems: "center",
      }}
    >
      <Image style={{ width: 75, height: 75 }} source={{ uri: img }} />
      <Text
        style={{
          paddingTop:5,
          fontSize: 10,
          fontWeight: "bold",

          textAlign: "center",
        }}
      >
        {title} | 30=50% OFF
      </Text>
    </View>
  );
}
