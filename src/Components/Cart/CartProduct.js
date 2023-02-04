import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";

import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../Constants/res/COLORS";
import Image from "react-native-scalable-image";
import {
  decreaseProductQuantityAPI,
  deleteProductFromCartAPI,
  increaseProductQuantityAPI,
} from "../../API/lib/product";
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
  const [Quantity, setQuantity] = useState(ProductQuantity);
  const [processRunning, setProcessRunning] = useState(false);

  const IncreaseProductQuantity = async () => {
    setProcessRunning(true);
    await increaseProductQuantityAPI({
      ProductId: ProductId,
    })
      .then(async (response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          setProcessRunning(false);
          setQuantity(Quantity+1)
          functionQuantityChange();
        }
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setProcessRunning(false);
      });
  };

  const DecreaseProductQuantity = async () => {
    setProcessRunning(true);
    if (Quantity > 1) {
      
      await decreaseProductQuantityAPI({
        ProductId: ProductId,
      })
        .then(async (response) => {
          console.log(response.data);
          if (response.data.status == 200) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            setProcessRunning(false);
            setQuantity(Quantity-1)
            functionQuantityChange();
          }
        })
        .catch((err) => {
          setProcessRunning(false);
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
    if (Quantity == 1) {
      await deleteProductFromCartAPI({
        ProductId: ProductId,
      })
        .then(async (response) => {
          console.log(response.data);

          if (response.data.status == 200) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            setProcessRunning(false);
            //refresh cart screen
            functionQuantityChange();
          } else {
            setProcessRunning(false);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          }
        })
        .catch((err) => {
          setProcessRunning(false);
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 0.4,
        paddingVertical: 10,
      }}
    >
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
            disabled={processRunning}
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
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 17, textAlign: "center" }}>
              {Quantity}
            </Text>
          </View>
          <TouchableOpacity
            disabled={processRunning}
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
