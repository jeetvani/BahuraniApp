import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import Image from "react-native-scalable-image";
// import MessageStatus from "./MessageStatus";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class MessageBox extends React.Component {
  render() {
    return (
      <>
        {this.props.sender ? (
          <>
            <View
              style={{
                paddingHorizontal: 4,
                paddingVertical: 4,
                alignItems: "flex-end",
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                }}
              >
                {this.props.type == "image" ? (
                  <View style={{ padding: 2 }}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.navigate("ImageView", {
                          ImgSrc: this.props.extraData.img_url,
                        })
                      }
                    >
                      <Image
                        source={{ uri: this.props.extraData.img_url }}
                        height={150}
                        borderRadius={10}
                        style={{ borderRadius: 10 }}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ) : null}
                {this.props.MessageContent == "" ? null : (
                  <Text
                    style={{
                      color: "white",
                      paddingVertical: 7,
                      paddingHorizontal: 7,
                    }}
                  >
                    {this.props.MessageContent}
                  </Text>
                )}
              </View>

              {/* <MessageStatus MessageId={this.props.extraData.messageid} RoomID={this.props.roomID}/> */}
            </View>
          </>
        ) : (
          <View
            style={{
              paddingHorizontal: 4,
              paddingVertical: 4,
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                borderRadius: 10,
              }}
            >
              {this.props.type == "image" ? (
                <View style={{ padding: 2 }}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate("ImageView", {
                        ImgSrc: this.props.extraData.img_url,
                      })
                    }
                  >
                    <Image
                      source={{ uri: this.props.extraData.img_url }}
                      height={150}
                      borderRadius={10}
                      style={{ borderRadius: 10 }}
                    />
                  </TouchableWithoutFeedback>
                </View>
              ) : null}
              {this.props.MessageContent == "" ? null : (
                <Text
                  style={{
                    color: "black",
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                  }}
                >
                  {this.props.MessageContent}
                </Text>
              )}
            </View>
          </View>
        )}
      </>
    );
  }
}
