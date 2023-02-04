import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../Constants/res/COLORS";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../Constants/appScreens";
export default function ScreenHeader({
  heading,
  backButton,
  searchBar,
  wishlistIcon,
  onSearchFocus,
  autoFocus,
  cart,
  onSearch,
}) {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: COLORS.primary, paddingVertical: 10 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Bottomtab");
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.white }}>
            <FontAwesome
              name={backButton ? "chevron-left" : "bars"}
              size={18}
            />
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 6, justifyContent: "center" }}>
          {heading ? (
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 20, color: COLORS.white }}>
                {heading}
              </Text>
            </View>
          ) : (
            <View style={styles.searchSection}>
              <Ionicons
                style={styles.searchIcon}
                name="ios-search"
                size={20}
                color="#000"
              />
              <TextInput
                autoFocus={false}
                onFocus={
                  onSearchFocus
                    ? onSearchFocus
                    : () => {
                        navigation.navigate(appStackScreens.ProductScreen.name);
                      }
                }
                style={styles.input}
                placeholder="Search Bahurani Brand"
                onChangeText={onSearch ? onSearch : null}
                underlineColorAndroid="transparent"
              />
            </View>
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text
            onPress={() => {
              navigation.navigate("CartMain");
            }}
            style={{ color: COLORS.white }}
          >
            <FontAwesome
              name={wishlistIcon ? "heart" : "shopping-cart"}
              size={18}
            />
          </Text>
        </View>
        {cart ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Text
              onPress={() => {
                navigation.navigate("CartMain");
              }}
              style={{ color: COLORS.white }}
            >
              <FontAwesome
                name={wishlistIcon ? "search" : "search"}
                size={18}
              />
            </Text>
          </View>
        ) : null}
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
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 80,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderRadius: 80,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});
