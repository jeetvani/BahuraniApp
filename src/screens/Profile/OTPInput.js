import { View, Text, TextInput, Dimensions, Keyboard } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import PrimaryAuthHeader from "../../Components/Auth/PrimaryAuthHeader";
import PrimaryButton from "../../Components/PrimaryButton";
import InputBlocks from "../../Components/Auth/InputBlocks";
import { firebase } from "@react-native-firebase/auth";
import verifyOTP from "../../functions/verifyOTP";
import { checkPhoneNumber, userLogin } from "../../API/lib/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { authStackScreens } from "../../Constants/appScreens";
import OTPTextInput from "react-native-otp-textinput";
import OTPInputView from "react-native-otp-box";
import CodeInput from "react-native-confirmation-code-input";
import generateOTP from "../../functions/generateOTP";
import RNOtpVerify from "react-native-otp-verify";
export default function OTPInput({ route }) {
  const [Timer, setTimer] = useState(30);
  //make a 30 sec timer using ref and useEffect

  const timer = useRef(30);
  useEffect(() => {
   const OurTimer =  setInterval(() => {
      if (timer.current == 1) {
        clearInterval(OurTimer);
      }

      timer.current = timer.current - 1;
      setTimer(timer.current);
    }, 1000);
  }, []);

  React.useEffect(() => {
    RNOtpVerify.getHash().then(console.log).catch(console.log);

    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(otpHandler))
      .catch((p) => console.log(p));

    return () => RNOtpVerify.removeListener();
  }, []);

  const otpHandler = (message:String) => {
    console.log(message);
    // const otp = /(\d{4})/g.exec(message)[1];
    
    // console.log(otp);

    RNOtpVerify.removeListener();
    Keyboard.dismiss();
  };
  const navigation = useNavigation();
  let verificationId = route.params.verificationId;
  const phoneNumber = route.params.phoneNumber;
  const [isLoading, setIsLoading] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  async function verify(otpCode) {
    setIsLoading(true);
    verifyOTP(verificationId, otpCode ? otpCode : otp)
      .then((res) => {
        console.log(res);
        checkPhoneNumber(phoneNumber).then((response) => {
          console.log(response.data);
          const action = response.data.perform;
          if (action === "login") {
            userLogin(phoneNumber).then(async (res) => {
              console.log(res.data);
              if (res.data.status == 200) {
                const UserId = res.data.UserId;
                await AsyncStorage.setItem("UserId", UserId);
                navigation.navigate(authStackScreens.AccountDetails.name);
              }
            });
          } else if (action === "signup") {
            navigation.navigate(authStackScreens.UserRegistrationForm.name, {
              phoneNumber: phoneNumber,
            });
          }
        });
      })
      .catch((err) => {
        alert(`The OTP you entered is incorrect. Please try again.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue("1234");
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: COLORS.white,
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <PrimaryAuthHeader
          fontSize={26}
          headText={"Verify Phone Number"}
          subText={`An SMS with a 6 digit OTP has been sent to `}
        />

        <Text style={{ marginTop: 5, color: COLORS.black, fontWeight: "bold" }}>
          {phoneNumber} {"  "}{" "}
          <Text
            style={{ color: COLORS.primary }}
            onPress={() => {
              navigation.navigate(authStackScreens.PhoneInput.name);
            }}
          >
            Change{" "}
          </Text>
        </Text>
      </View>
      <View
        style={{
          paddingTop: 0,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CodeInput
          onChangeText={(text) => {
            setOtp(text);
          }}
          codeLength={6}
          activeColor={COLORS.primary}
          onFulfill={(code) => {
            setOtp(code);
            verify(code);
          }}
          inactiveColor={COLORS.primary}
          autoFocus={true}
          ignoreCase={true}
          autoComplete="sms-otp"
          inputPosition="center"
          keyboardType="numeric"
          className="border-b"
        />
      </View>
      <View style={{ flex: 0.2 }}>
        <Text
          style={{
            textAlign: "right",
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 10,
          }}
          onPress={() => {
            generateOTP("+91" + phoneNumber);
          }}
        >
          Resend OTP in {Timer} sec
        </Text>
      </View>
      <View style={{ paddingBottom: 30, flex: 1, justifyContent: "flex-end" }}>
        <PrimaryButton
          disabled={otp.length < 6}
          buttonHeight={50}
          fontSize={20}
          isLoading={isLoading}
          borderRadius={30}
          onPress={verify}
          filled
          content={"Verify"}
        />
      </View>
    </View>
  );
}
