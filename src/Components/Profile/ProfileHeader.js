import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Image from "react-native-scalable-image";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../Constants/res/COLORS";
import SearchBar from "../SearchBar";

export default function ProfileHeader({
  userName,
  profilePicture,
  isMarketingUser,
  phoneNumber,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 0.6,
        borderRadius: 5,
        borderColor: COLORS.black,
        marginVertical: 10,
      }}
    >
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: COLORS.black }}>
          Hey {userName} !{" "}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: COLORS.black,
            paddingTop: 5,
          }}
        >
          {isMarketingUser ? (
            <Text>
              {" "}
              <FontAwesome size={15} name="star" color={COLORS.primary} />{" "}
              Bahurani Marketing User
            </Text>
          ) : (
            <Text>
              {" "}
              <FontAwesome size={15} name="phone" color={COLORS.primary} />{" "}
              {phoneNumber}
            </Text>
          )}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          borderRadius={80}
          height={60}
          source={{
            uri: profilePicture
              ? profilePicture
              : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    elevation: 20,
    shadowColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  screenHeaderContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  cartIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: 30,
    paddingVertical: 0,
  },
});
