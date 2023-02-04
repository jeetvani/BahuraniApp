import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import PrimaryButton from "../../Components/PrimaryButton";
import FormInput from "../../Components/Auth/FormInput";
import { firebase } from "@react-native-firebase/storage";
import ScreenHeader from "../../Components/ScreenHeader";
import { updateProfilePicture, updateUserName } from "../../API/lib/user";

export default function EditProfile({ route }) {
  const userName = route.params.userName;
  const phoneNumber = route.params.phoneNumber;
  const profilePicture = route.params.profilePicture;
  const [PhoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [ImgSrc, setImgSrc] = useState(profilePicture);
  const [Name, setName] = useState(userName);
  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setImgSrc(result.assets[0].uri);
    if (!result.canceled) {
      console.log(result.assets);
      setImgSrc(result.assets[0].uri);

      const reference = firebase
        .storage()
        .ref(Math.random().toString(36).slice(2, 7) + ".png");
      await reference.putFile(result.assets[0].uri).then((res) => {
        console.log("Image uploaded to the bucket!");
        reference.getDownloadURL().then((url) => {
          console.log(url);
          updateProfilePicture(url)
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                console.log("Profile picture updated");
                ToastAndroid.show(
                  "Profile picture updated",
                  ToastAndroid.SHORT
                );
              }
              if (res.data.status === 500) {
                console.log("Server error");
                ToastAndroid.show("Server error", ToastAndroid.SHORT);
              }
            })
            .catch((err) => {
              console.log(err);
              ToastAndroid.show("Server error", ToastAndroid.SHORT);
            });
        });
      });
    }
  };

  const UpdateName = async () => {
    if (Name.length < 3) {
      ToastAndroid.show(
        "Name must be atleast 3 characters",
        ToastAndroid.SHORT
      );
    } else {
      await updateUserName(Name)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            console.log("Name updated");
            ToastAndroid.show("Name updated", ToastAndroid.SHORT);
          }
          if (res.data.status === 500) {
            console.log("Server error");
            ToastAndroid.show("Server error", ToastAndroid.SHORT);
          }
        })
        .catch((err) => {
          console.log(err);
          ToastAndroid.show("Server error", ToastAndroid.SHORT);
        });
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <ScreenHeader heading={"Edit Profile"} />
      <ScrollView>
        <View style={{ marginVertical: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{
                borderRadius: 80,
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: COLORS.primary,
              }}
              source={{ uri: ImgSrc }}
            />
            <View style={{ alignItems: "center" }}>
              <Text
                onPress={chooseImage}
                style={{
                  backgroundColor: COLORS.primary,
                  textAlign: "center",
                  paddingHorizontal: 6,
                  paddingVertical: 5,
                  borderRadius: 80,
                  bottom: 10,
                }}
              >
                <FontAwesome name="pencil" size={12} color={COLORS.white} />
              </Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                value={Name}
                placeholder={"Name"}
                onchangeText={(text) => {
                  setName(text);
                }}
                maxLength={50}
                Icon={"user-o"}
              />
              <View style={{ marginVertical: 10 }}>
                <PrimaryButton
                onPress={UpdateName}
                  fontSize={16}
                  filled={true}
                  content={"Update Name"}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <FormInput
                value={PhoneNumber}
                placeholder={"Phone Number"}
                onchangeText={(text) => {}}
                Icon={"phone"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <PrimaryButton fontSize={16} filled={true} content={"Update PhoneNumber"} />
            </View>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
