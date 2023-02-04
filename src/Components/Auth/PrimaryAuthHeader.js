import { View, Text, Image } from "react-native";
import React from "react";

import { COLORS } from "../../Constants/res/COLORS";


export default function PrimaryAuthHeader({
  headText,
  subText,
  fontSize,
  subText2,
  color,
  textAlign,
}) {
  return (
    <View>
      <Text
        style={{
          textAlign: textAlign ? textAlign : null,
          fontSize: fontSize ? fontSize : 36,
          color: color ? color : COLORS.primary,
          fontWeight: "bold",
          marginRight: 70,
        }}
      >
        {headText}
      </Text>
      <Text style={{ marginTop: 5, color: COLORS.primary }}>{subText}</Text>
    </View>
  );
}
