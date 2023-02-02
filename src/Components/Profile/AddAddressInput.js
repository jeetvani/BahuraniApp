import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";

export default function AddAddressInput({
  Placeholder,
  onChangeText,
  keyBoardType,
  maxLength,
  editable,
  value
}) {
  const [Focused, setFocused] = useState(false);
  return (
    <View>
      <TextInput
        value={value}
        editable={editable ? editable : true}
        maxLength={maxLength}
        keyboardType={keyBoardType}
        onChangeText={onChangeText}
        placeholder={Placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          paddingHorizontal: 7,
          paddingVertical: 10,
          borderWidth: Focused ? 0.7 : 0.4,
          borderColor: Focused ? COLORS.primary : COLORS.black,
          borderRadius: 5,
          fontSize: 13,
        }}
      />
    </View>
  );
}
