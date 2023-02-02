import { View, Text, ScrollView, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import PrimaryButton from "../../Components/PrimaryButton";
import { userRegister } from "../../API/lib/user";

import FormInput from "../../Components/Auth/FormInput";
import { appImages } from "../../Constants/appImages";
import { firebase } from "@react-native-firebase/storage";
import { v4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authStackScreens } from "../../Constants/appScreens";
import { useNavigation } from "@react-navigation/native";
export default function UserRegistrationForm({ route }) {
  const navigation = useNavigation();
  const phoneNumber = route.params.phoneNumber;
  const [Loading, setLoading] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [ReferCode, setReferCode] = useState("");

  const [ImgSrc, setImgSrc] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [Landmark, setLandmark] = useState("");
  const [PinCode, setPinCode] = useState("");
  const [Name, setName] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Street, setStreet] = useState("");
  const [HouseNo, setHouseNo] = useState("");
  const registerUser = async () => {
    //check if all fields are filled
    if (false) {
      alert("Please fill all the fields");
      return;
    } else {
      //alert if image is not selected
      if (
        ImgSrc ==
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      ) {
        alert("Please select an image");
        return;
      } else {
        setisLoading(true);
        const reference = firebase
          .storage()
          .ref(Math.random().toString(36).slice(2, 7) + ".png");
        const pathToFileURL = ImgSrc;
        await reference.putFile(pathToFileURL).then((res) => {
          console.log("Image uploaded to the bucket!");

          reference.getDownloadURL().then((url) => {
            console.log(url);
            const userObj = {
              name: Name,
              phoneNumber: phoneNumber,
              profilePicture: url,
              referCode: ReferCode,
              address:
                Street +
                " | " +
                HouseNo +
                " | " +
                Landmark +
                " | " +
                City +
                " | " +
                State,
              PinCode: PinCode,
            };
            userRegister(userObj).then((res) => {
              console.log(res.data);
              if (res.data.status == 200) {
                const UserId = res.data.userId;
                AsyncStorage.setItem("UserId", UserId);
                console.log("User Registered Successfully");
                setisLoading(false);
                navigation.navigate(authStackScreens.AuthCheck.name);
              } else {
                console.log("User Registration Failed");
                alert("User Registration Failed");
                setisLoading(false);
              }
            });
          });
        });
      }
    }
  };
  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    setImgSrc(result.assets[0].uri);
    if (!result.canceled) {
      console.log("====================================");
      console.log(result.assets);
      setImgSrc(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <ScrollView>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            marginHorizontal: 30,
          }}
        >
          <View style={{ flex: 2, marginHorizontal: 10 }}>
            <Image
              source={appImages.logo}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text
              style={{
                fontSize: 20,
                paddingHorizontal: 3,
                color: COLORS.primary,
              }}
            >
              Welcome to Bahurani Brand !
            </Text>
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 3,
                color: COLORS.primary,
              }}
            >
              Register Now to discover more
            </Text>
          </View>
        </View>
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
                placeholder={"Name"}
                onchangeText={(text) => {
                  setName(text);
                }}
                maxLength={50}
                Icon={"user-o"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                onchangeText={(text) => {
                  setPinCode(text);
                }}
                maxLength={6}
                placeholder={"Pin Code"}
                keyBoardType={"number-pad"}
                Icon={"map-o"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                onchangeText={(text) => {
                  setReferCode(text);
                }}
                maxLength={20}
                placeholder={"Referral Code (Optional)"}
                Icon={"bullhorn"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                onchangeText={(text) => {
                  setHouseNo(text);
                }}
                placeholder={"House No"}
                Icon={"map-marker"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                onchangeText={(text) => {
                  setState(text);
                }}
                placeholder={"State"}
                Icon={"map-marker"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                onchangeText={(text) => {
                  setStreet(text);
                }}
                placeholder={"Street"}
                Icon={"map-marker"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <FormInput
                onchangeText={(text) => {
                  setCity(text);
                }}
                placeholder={"City"}
                Icon={"map-marker"}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <FormInput
                placeholder={"Landmark"}
                onchangeText={(text) => {
                  setLandmark(text);
                }}
                Icon={"map-marker"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <PrimaryButton
                onPress={registerUser}
                isLoading={isLoading}
                fontSize={16}
                filled={true}
                content={"Register"}
              />
            </View>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
