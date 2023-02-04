import { View, Text, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import { FontAwesome } from "@expo/vector-icons";
export default function FormInput({
  Icon,
  maxLength,
  onchangeText,
  keyBoardType,
  placeholder,
  value,
}) {
  return (
    <View
      style={{
        borderColor: COLORS.black,
        borderWidth: 0.4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }}
    >
      <FontAwesome
        name={Icon}
        style={{
          paddingHorizontal: 10,
        }}
        size={20}
        color={COLORS.primary}
      />
      <TextInput
        onChangeText={onchangeText}
        maxLength={maxLength}
        value={value ? value : null}
        placeholder={placeholder}
        keyboardType={keyBoardType}
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 0,
          backgroundColor: "#fff",
          color: "#424242",
        }}
      />
    </View>
  );
}
