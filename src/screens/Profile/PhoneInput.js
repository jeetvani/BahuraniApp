import { View, Text, ScrollView, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import PrimaryAuthHeader from "../../Components/Auth/PrimaryAuthHeader";
import { FontAwesome } from "@expo/vector-icons";
import PrimaryButton from "../../Components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { authStackScreens } from "../../Constants/appScreens";
import generateOTP from "../../functions/generateOTP";
export default function PhoneInput() {
  const [textInputFocused, settextInputFocused] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  async function sendOTP() {
    const number = phoneNumber;
    const final = `+91` + number;
    setisLoading(true);

    generateOTP(final)
      .then((res) => {
        console.log(res);
        navigation.navigate(authStackScreens.OTPInput.name, {
          verificationId: res.verificationId,
          phoneNumber: phoneNumber,
        });
      })
      .catch((err) => {
        alert(err);
        setisLoading(false);
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 30,
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <PrimaryAuthHeader
          headText={"Sign in to Bahurani Mart !"}
          subText={"to access your Addresses , Orders & Wishlist "}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View>
          <TextInput
            onFocus={() => settextInputFocused(true)}
            //     onBlur={() => settextInputFocused(false)}
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="Enter Your Mobile Number"
            keyboardType="number-pad"
            style={{
              paddingVertical: 5,
              paddingHorizontal: 50,
              borderBottomWidth: 1,
              borderColor: textInputFocused ? COLORS.primary : COLORS.gray,
              borderRadius: 8,
              fontSize: 16,
            }}
          />
          <Text
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              paddingRight: 4,
              borderRightColor: COLORS.gray,
              borderRightWidth: 1,
            }}
          >
            +91
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 20,
        }}
      >
        <PrimaryButton
        
          buttonHeight={50}
          fontSize={20}
          isLoading={isLoading}
          onPress={sendOTP}
          borderRadius={30}
          filled
          disabled={phoneNumber.length < 10}
          content={"Get OTP"}
        />
        <Text style={{ paddingTop: 10 }}>
          By continuing you agree to our{" "}
          <Text style={{ color: COLORS.primary }}>Terms of Use</Text> and{" "}
          <Text style={{ color: COLORS.primary }}>
            Privacy Policy & Legal Policy
          </Text>
        </Text>
      </View>
    </View>
  );
}
