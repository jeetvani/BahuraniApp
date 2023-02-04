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
import {
  checkPhoneNumber,
  updatePhoneNumberAPI,
  updateProfilePicture,
  updateUserName,
} from "../../API/lib/user";
import generateOTP from "../../functions/generateOTP";
import DraggablePanel from "react-native-draggable-panel";
import OTPTextInput from "react-native-otp-textinput";
import PrimaryAuthHeader from "../../Components/Auth/PrimaryAuthHeader";
import verifyOTP from "../../functions/verifyOTP";
import { useNavigation } from "@react-navigation/native";
export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const userName = route.params.userName;
  const [VerificationId, setVerificationId] = useState("");
  const [PanelVisible, setPanelVisible] = useState(false);
  const phoneNumber = route.params.phoneNumber;
  const profilePicture = route.params.profilePicture;
  const [PhoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [updatingPhoneNumber, setUpdatingPhoneNumber] = useState(false);
  const [ImgSrc, setImgSrc] = useState(profilePicture);
  const [Name, setName] = useState(userName);
  const [Otp, setOtp] = useState("");
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

  const updatePhoneNumber = async () => {
    if (PhoneNumber.length < 10) {
      ToastAndroid.show(
        "Phone number must be 10 digits long",
        ToastAndroid.SHORT
      );
    } else {
      setUpdatingPhoneNumber(true);
      checkPhoneNumber(PhoneNumber)
        .then((res) => {
          if (res.data.perform === "signup") {
            console.log("Phone number available");
            generateOTP(`+91` + PhoneNumber)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  console.log("OTP sent successfully");
                  ToastAndroid.show(
                    "OTP sent successfully",
                    ToastAndroid.SHORT
                  );
                  setPanelVisible(true);
                  setUpdatingPhoneNumber(false);
                  setVerificationId(res.verificationId);
                }
                if (res.status === 500) {
                  console.log("Server error");
                  ToastAndroid.show("Server error", ToastAndroid.SHORT);
                  setUpdatingPhoneNumber(false);
                }
              })
              .catch((err) => {
                console.log(err);
                ToastAndroid.show("Server Error", ToastAndroid.SHORT);
                setUpdatingPhoneNumber(false);
              });
          }
          if (res.data.perform === "login") {
            console.log("Phone number already registered");
            ToastAndroid.show(
              "Phone number already registered",
              ToastAndroid.SHORT
            );
            setUpdatingPhoneNumber(false);
          }
        })
        .catch((err) => {
          console.log(err);
          ToastAndroid.show("Server error", ToastAndroid.SHORT);
          setUpdatingPhoneNumber(false);
        });
    }
  };

  const verifyOTPNow = async () => {
    verifyOTP(VerificationId, Otp).then((res) => {
      if (res) {
        console.log("OTP verified successfully");
        ToastAndroid.show("OTP verified successfully", ToastAndroid.SHORT);
        updatePhoneNumberAPI(PhoneNumber).then((res) => {
          if (res.data.status === 200) {
            console.log("Phone number updated");
            ToastAndroid.show("Phone number updated", ToastAndroid.SHORT);
            setPanelVisible(false);
            navigation.goBack();
          }
          if (res.data.status === 500) {
            console.log("Server error");
            ToastAndroid.show("Server error", ToastAndroid.SHORT);
          }
        });
      } else {
        console.log("Invalid OTP");
        ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
      }
    });
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <DraggablePanel
        visible={PanelVisible}
        onRequestClose={() => setPanelVisible(false)}
        onDismiss={() => setPanelVisible(false)}
        onShow={() => setPanelVisible(true)}
        hideOnBackButtonPressed
      >
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 20,
              width: 250,
              fontWeight: "bold",
              marginVertical: 20,
              color: COLORS.primary,
            }}
          >
            Enter the OTP sent to your phone number
          </Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <OTPTextInput
            handleTextChange={(text) => setOtp(text)}
            inputCount={6}
            tintColor={COLORS.primary}
          ></OTPTextInput>

          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <PrimaryButton
              filled
              onPress={verifyOTPNow}
              content={"Verify & Update"}
            />
          </View>
        </View>
      </DraggablePanel>
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
                  borderRadius={5}
                  filled={true}
                  content={"Update Name"}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <FormInput
                value={PhoneNumber}
                keyBoardType={"number-pad"}
                placeholder={"Phone Number"}
                
                onchangeText={(text) => setPhoneNumber(text)}
                Icon={"phone"}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <PrimaryButton
                fontSize={16}
                borderRadius={5}
                filled={true}
                isLoading={updatingPhoneNumber}
                onPress={updatePhoneNumber}
                content={"Update PhoneNumber"}
              />
            </View>
            <View></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
