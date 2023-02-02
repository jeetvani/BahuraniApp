import { View, Text, Dimensions } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import AnimatedLottieView from "lottie-react-native";
import PrimaryButton from "../../Components/PrimaryButton";
import PrimaryAuthHeader from "../../Components/Auth/PrimaryAuthHeader";
import { useNavigation } from "@react-navigation/native";
import { bottomTabScreens } from "../../Constants/appScreens";

export default function OrderSuccess({route}) {
  const saved = route.params.saved;
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ marginTop: 10, marginHorizontal: 30 }}>
        <PrimaryAuthHeader headText={"Congratulations !"} fontSize={24} />
        <PrimaryAuthHeader
          headText={"Your Order was placed successfully"}
          fontSize={22}
        />
        <PrimaryAuthHeader
          headText={`You saved  ₹${saved} on this order`}
          fontSize={18}
          color={COLORS.Positive}
        />
      </View>
      <AnimatedLottieView
        source={require("../../../assets/Order_Success.json")}
        autoPlay
        loop={false}
      />
      <View
        style={{
          marginHorizontal: 30,
          top: Dimensions.get("screen").height * 0.6,
        }}
      >
        <PrimaryButton
          onPress={() => {
            navigation.navigate("Bottomtab")
          }}
          content={"Continue Shopping"}
        />
      </View>
    </View>
  );
}
