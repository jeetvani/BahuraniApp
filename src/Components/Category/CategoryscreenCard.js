import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import Image from "react-native-scalable-image";

export default function CategoryscreenCard({
  image,
  title,
  numberOfProducts,
  onPress,
}) {
  return (
    <View
      style={{ alignItems: "center", marginHorizontal: 5, marginVertical: 6 }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.gray,
            paddingTop: 12,
            paddingHorizontal: 10,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
          }}
        >
          <Image
            width={70}
            source={{
              uri: image,
            }}
          />
        </View>
        <Text
          numberOfLines={2}
          style={{
            fontSize: 11,
            textAlign: "center",
            marginTop: 4,
            width: 50,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            paddingHorizontal: 5,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 5,
            top: -16,
          }}
        >
          <Text
            style={{ fontSize: 8, color: COLORS.primary, fontWeight: "bold" }}
          >
            UP TO
          </Text>
          <Text style={{ fontSize: 10, color: COLORS.primary }}>
            {numberOfProducts}% OFF
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
