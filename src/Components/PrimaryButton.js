import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "../Constants/res/COLORS";
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
export default function PrimaryButton({
  filled,
  content,
  onPress,
  isLoading,
  borderRadius,
  fontSize,
  buttonHeight,
  disabled,
  icon,
  textAlign,
  borderWidth,
  borderColor,
  textColor,
}) {
  return (
    <View>
      <TouchableOpacity
        disabled={isLoading || disabled}
        onPress={onPress}
        style={{
          alignItems: isLoading ? "center" : null,
          height: buttonHeight ? buttonHeight : 34,
          borderRadius: borderRadius ? borderRadius : null,
          justifyContent: "center",
          backgroundColor: filled ? COLORS.primary : COLORS.white,
          borderWidth: borderWidth ? borderWidth : 1.5,
          borderColor: borderColor ? borderColor : COLORS.primary,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Text
          style={{
            justifyContent: "center",
            textAlign: textAlign ? textAlign : "center",
            fontWeight: "bold",
            fontSize: fontSize ? fontSize : 12,
            color: filled
              ? textColor
                ? textColor
                : COLORS.white
              : textColor
              ? textColor
              : COLORS.primary,
            paddingLeft: textAlign ? 15 : null,
          }}
        >
          {" "}
          <FontAwesome5 size={14} color={COLORS.primary} name={icon} />
          {"  "}
          {isLoading ? (
            <Text
              style={{
                textAlign: "center",
                color: textColor ? textColor : COLORS.primary,
              }}
            >
              <ActivityIndicator
                size={20}
                animating
                color={filled ? COLORS.white : COLORS.primary}
              />
            </Text>
          ) : (
            content
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
