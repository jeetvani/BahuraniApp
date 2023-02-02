import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";

import { appImages } from "../../Constants/appImages";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/res/COLORS";
import Image from "react-native-scalable-image";
import {
  decreaseProductQuantityAPI,
  deleteProductFromCartAPI,
  increaseProductQuantityAPI,
} from "../../API/lib/product";
import { useNavigation, NavigationAction } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";
export default function CartProduct({
  ImgSrc,
  Name,
  OurPrice,
  MRP,
  Variant,
  ProductId,
  ProductQuantity,
  functionQuantityChange,
}) {
  const navigation = useNavigation();
  const [Quantity, setQuantity] = useState(ProductQuantity);

  const IncreaseProductQuantity = () => {
    increaseProductQuantityAPI({
      ProductId: ProductId,
    }).then((response) => {
      console.log(response.data);
      if (response.data.status == 200) {
        setQuantity(parseInt(Quantity) + 1);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      functionQuantityChange()
      }
    });
  };

  const DecreaseProductQuantity = () => {
    if (Quantity > 1) {
      decreaseProductQuantityAPI({
        ProductId: ProductId,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == 200) {
            setQuantity(parseInt(Quantity) - 1);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
              functionQuantityChange();
          }
        })
        .catch((err) => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
    if (Quantity == 1) {
      deleteProductFromCartAPI({
        ProductId: ProductId,
      }).then((response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          //refresh cart screen
        functionQuantityChange()
        } else {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      });
    }
  };
  return (
    <View style={{ flexDirection: "row",borderBottomWidth:0.4,paddingVertical:10 }}>
      <View style={{ flex: 2 }}>
        <Image
          height={100}
          
          source={{
            uri: ImgSrc,
          }}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "center" }}>
        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: "bold" }}>
          {Name}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontSize: 13, paddingVertical: 5, color: "#959191" }}
        >
          {Variant}
        </Text>
        <View style={{ paddingVertical: 5, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              ₹{OurPrice * Quantity}
              {"  "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textDecorationLine: "line-through",
                  paddingHorizontal: 5,
                  color: "#B0A7A7",
                }}
              >
                ₹{MRP * Quantity}{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: COLORS.Positive,
                  paddingHorizontal: 3,
                }}
              >
                {"  "}
                {(MRP - OurPrice) * Quantity} off
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: "flex-end", bottom: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={DecreaseProductQuantity}
            style={{
              flex: 1,
              borderRadius: 3,
              backgroundColor: COLORS.primary,
              paddingHorizontal: 3,
              paddingVertical: 8,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,

                color: COLORS.white,
                textAlign: "center",
              }}
            >
              <FontAwesome name="minus" size={12} />
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 ,justifyContent:'center'}}>
            <Text style={{ fontSize: 17, textAlign: "center" }}>
              {Quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={IncreaseProductQuantity}
            style={{
              flex: 1,
              borderRadius: 3,
              backgroundColor: COLORS.primary,
              paddingHorizontal: 3,
              paddingVertical: 8,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                textAlign: "center",
              }}
            >
              <FontAwesome name="plus" size={12} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
