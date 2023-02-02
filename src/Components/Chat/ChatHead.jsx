import React from "react";
import { Text } from "react-native";
import { View } from "react-native";

// import { Container } from './styles';

const ChatHead = ({ Head, ChannelPic, typing }) => {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 15,
            borderWidth: 1,
            borderColor: "#efefef",
            marginHorizontal: 10,
            borderRadius: 8,
            marginVertical: 5,
          }}
        >
          <View style={{ position: "absolute", left: 70, top: 8 }}></View>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>{Head}</Text>
        </View>
      </View>
    </>
  );
};

export default ChatHead;
