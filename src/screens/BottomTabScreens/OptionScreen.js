import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import PrimaryButton from "../../Components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";

export default function OptionScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader heading={"Settings"} />
      <ScrollView>
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              borderRadius={5}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
              content={"Notifications"}
              icon={"bell"}
              onPress={() => navigation.navigate("NotificationSettings")}
              fontSize={14}
              textAlign={"left"}
              buttonHeight={50}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              borderRadius={5}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
              onPress={() => navigation.navigate(appStackScreens.Policies.name)}
              content={"Terms & Conditions"}
              icon={"file-alt"}
              fontSize={14}
              textAlign={"left"}
              buttonHeight={50}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              onPress={() => navigation.navigate(appStackScreens.Policies.name)}
              borderRadius={5}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
              content={"Privacy Policy"}
              icon={"lock"}
              fontSize={14}
              textAlign={"left"}
              buttonHeight={50}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              onPress={() => navigation.navigate(appStackScreens.Policies.name)}
              borderRadius={5}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
              content={"About Us"}
              icon={"info-circle"}
              fontSize={14}
              textAlign={"left"}
              buttonHeight={50}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              borderRadius={5}
              content={"Contact Us"}
              icon={"phone-alt"}
              fontSize={14}
              onPress={() => {
                Linking.openURL("tel:1234567890");
              }}
              textAlign={"left"}
              buttonHeight={50}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              borderRadius={5}
              content={"Rate Us"}
              icon={"star"}
              fontSize={14}
              textAlign={"left"}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
              buttonHeight={50}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <PrimaryButton
              borderRadius={5}
              content={"Share App"}
              icon={"share-alt"}
              fontSize={14}
              borderColor={COLORS.black}
              borderWidth={0.4}
              textColor={COLORS.black}
              textAlign={"left"}
              buttonHeight={50}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
