import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/database";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenHeader from "../../Components/ScreenHeader";
//import * as uuid from "react-native-uuid";
//import { ListItem } from "react-native-elements/dist/list/ListItem";
import ChatHead from "../../Components/Chat/ChatHead";
import EmptyChat from "../../Components/Chat/EmptyChat";
import MessageBox from "../../Components/Cart/MessageBox";
import MessageInput from "../../Components/Chat/MessageInput";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import { Container } from './styles';
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import VisibilitySensor from "@svanboxel/visibility-sensor-react-native";
import { COLORS } from "../../Constants/res/COLORS";

const AdminUserChat = ({ route }) => {
  // const RoomData = route.params.RoomData;

  const navigation = useNavigation();
  const sendImage = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,

      quality: 0.5,
    }).then((res) => {
      console.log(res);
      if (res.cancelled) return;
      console.log(res.uri);
      // navigation.navigate("SendImage", {
      //   src: res.uri,
      //   roomId: "RoomData.roomId",
      // });
    });
  };
  const [ChatData, setChatData] = useState([]);
  const [UserID, setUserID] = useState("");

  console.log("RoomData");
  const layoutAnimConfig = {
    duration: 300,
    delete: {
      duration: 1000,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: 1000,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const [NochatData, setNochatData] = useState(false);
  const [Typing, setTyping] = useState(false);
  async function GetUserData() {
    const id = await AsyncStorage.getItem("id");
    setUserID(id);
  }

  //   useEffect(async () => {
  //     const id = await AsyncStorage.getItem("id");
  //     const keyboardDidShowListener = Keyboard.addListener(
  //       "keyboardDidShow",
  //       () => {
  //         console.log("sigjhotgoirwoij");
  //         firebase
  //           .database()
  //           .ref("/Chatlist/" + id + "/" + RoomData.Id)
  //           .update({ typing: true });
  //       }
  //     );
  //     const keyboardDidHideListener = Keyboard.addListener(
  //       "keyboardDidHide",
  //       () => {
  //         firebase
  //           .database()
  //           .ref("/Chatlist/" + id + "/" + RoomData.Id)
  //           .update({ typing: false });
  //       }
  //     );

  //     return () => {
  //       keyboardDidHideListener.remove();
  //       keyboardDidShowListener.remove();
  //     };
  //   }, []);
  const handleImageVisibility = async (MessageId, Status, senderId) => {
    const id = await AsyncStorage.getItem("id");
    if (Status == "seen") return;
    if (senderId == id) {
    } else {
      firebase
        .database()
        .ref("/Room/" + "s" + "/" + MessageId)
        .update({
          status: "seen",
        });
    }
  };
  useEffect(() => {
    firebase
      .database()
      .ref("/Chatlist/" + "s" + "/" + UserID)
      .on("child_changed", (snapshot) => {
        const typing = snapshot.val().typing;

        setTyping(typing);
      });

    const onChildAdd = firebase
      .database()
      .ref("/Room/" + "s")
      .on("child_added", (snapshot) => {
        if (snapshot.val() == null) setNochatData(true);
        setNochatData(false);
        console.log("ChatData : ", snapshot.val());
        setChatData((state) => [...state, snapshot.val()]);
        LayoutAnimation.configureNext(layoutAnimConfig);
      });
    return () => {
      firebase
        .database()
        .ref("/Room/" + "s")
        .off("child_added", onChildAdd);
    };
  }, []);

  const SendMessage = async () => {
    const msgId = "";
    const id = await AsyncStorage.getItem("id");
    const messageData = {
      type: "text",
      Content: Message,
      senderId: id,
      sendTime: Date.now(),
      status: "Recieved",
      messageid: msgId,
    };
    firebase
      .database()
      .ref("/Room/" + "s" + "/" + "s")
      .update(messageData);
    setMessage("");
    firebase
      .database()
      .ref("/Chatlist/" + id + "/" + "s")
      .update({ lastUpdatedAt: Date.now(), lastmsg: Message });
    firebase
      .database()
      .ref("/Chatlist/" + "s" + "/" + id)
      .update({ lastUpdatedAt: Date.now(), lastmsg: Message });
  };
  const Sorted = () => {
    return ChatData.sort(function (a, b) {
      return b.sendTime - a.sendTime;
    });
  };

  const onMessageChange = (text) => {
    text.replace(/\s/g, "").length > 0 ? setMessage(text) : setMessage("");
  };
  const [MessageLength, setMessageLength] = useState(0);
  const [Message, setMessage] = useState("");

  return (
    <React.Fragment>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScreenHeader heading={"Help & Queries"} />
        {JSON.stringify(ChatData) == "[]" ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <EmptyChat
              Name={"Admin"}
              Image={
                "https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg"
              }
              Faculty={"Admin"}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            inverted
            data={Sorted()}
            renderItem={({ item }) => (
              <VisibilitySensor
                onChange={() => {
                  handleImageVisibility(
                    item.messageid,
                    item.status,
                    item.senderId
                  );
                }}
              >
                <MessageBox
                  navigation={navigation}
                  msgid={item.messageid}
                  roomID={"RoomData.roomId"}
                  extraData={item}
                  type={item.type}
                  status={item.status}
                  sender={item.senderId == UserID}
                  MessageContent={item.Content}
                />
              </VisibilitySensor>
            )}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
          }}
        >
          <View style={{ flex: 12 }}>
            <MessageInput
              Value={Message}
              onChangeText={(value) => {
                onMessageChange(value);
              }}
              Placeholder={"Message..."}
            />
          </View>
          <View style={{ flex: 1, right: 5, top: 5 }}>
            {Message == "" ? (
              <TouchableOpacity
                onPress={sendImage}
                style={{ borderRadius: 20 }}
              >
                <Text style={{ padding: 5 }}>
                  <FontAwesome color={COLORS.primary} size={18} name="paperclip" />
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={null}
                style={{ borderRadius: 20 }}
              >
                <Text style={{ padding: 5 }}>
                  <Ionicons color={COLORS.primary} size={18} name="send" />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};
export default AdminUserChat;
