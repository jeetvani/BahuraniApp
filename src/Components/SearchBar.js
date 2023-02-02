import { View, Text, StyleSheet, TextInput, Dimensions } from "react-native";
import React from "react";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../Constants/res/COLORS";
export default function SearchBar(onFocus) {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.passwordContainer}>
        <TextInput
          onFocus={onfocus}
          style={{ color: COLORS.primary }}
          autoCorrect={false}
          placeholder="Search Here"
        />
      </View>
      <View style={{ alignItems: "flex-end", bottom: 22 }}>
        <AntDesign name="search1" size={20} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    width: Dimensions.get("screen").width - 90,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
    paddingBottom: 3,
  },
});
