import React from "react";
import { Dimensions, TextInput, View } from "react-native";

// import { Container } from './styles';

const MessageInput = ({ Placeholder, onChangeText, Value, disabled }) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <TextInput
        value={Value}
        onChangeText={onChangeText}
        placeholder={"Enter Your Query"}
        style={{
          left: 5,
          backgroundColor: "#efefef",
          width: Dimensions.get("screen").width * 0.87,
          borderWidth: 0,
          borderColor: "#efefef",
          fontSize: 16,
          paddingVertical:5,
          paddingHorizontal: 18,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default MessageInput;
