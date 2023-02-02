import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

import { appImages } from "../../Constants/appImages";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/res/COLORS";
import Image from "react-native-scalable-image";
import PrimaryButton from "../PrimaryButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";
export default function WishlistCard({
  ImgSrc,
  Name,
  OurPrice,
  MRP,
  Variant,
  itemInCart,
}) {
  const [Quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 2 }}>
        <Image
          onPress={() => {
            navigation.navigate(appStackScreens.ProductDetails.name);
          }}
          width={100}
          source={{
            uri: ImgSrc,
          }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: "bold" }}>
          {Name}
        </Text>
        <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 3 }}>
          {Variant}
        </Text>
        <View style={{ paddingVertical: 5, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              ₹{OurPrice * Quantity}{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textDecorationLine: "line-through",
                  paddingHorizontal: 5,
                  color: "#B0A7A7",
                }}
              >
                ₹{MRP * Quantity}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: COLORS.Positive,
                  paddingHorizontal: 3,
                }}
              >
                {" "}
                {(MRP - OurPrice) * Quantity} off
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
          justifyContent: "flex-end",
          bottom: 15,
          right: 10,
          alignItems: "center",
        }}
      >
        {itemInCart ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  backgroundColor: COLORS.primary,
                  fontSize: 16,
                  paddingHorizontal: 3,
                  paddingVertical: 1,
                  color: COLORS.white,
                  textAlign: "center",
                }}
                onPress={() => {
                  Quantity <= 1 ? setQuantity(1) : setQuantity(Quantity - 1);
                }}
              >
                -
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, textAlign: "center" }}>
                {Quantity}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  backgroundColor: COLORS.primary,
                  fontSize: 16,
                  paddingHorizontal: 3,
                  paddingVertical: 1,
                  color: COLORS.white,
                  textAlign: "center",
                }}
                onPress={() => {
                  setQuantity(Quantity + 1);
                }}
              >
                +
              </Text>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View style={styles.addToCartButtonContainer}>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    <FontAwesome name="cart-plus" size={20} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <View style={styles.addToCartButtonContainer}>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    <FontAwesome name="trash" size={20} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  addToCartButtonContainer: {
    backgroundColor: COLORS.black,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 3,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});
