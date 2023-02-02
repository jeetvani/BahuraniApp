import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import PrimaryButton from "../PrimaryButton";

export default function ProductScreenCard({ image, price, mrp, name }) {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,padding:10,
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <Image style={{ width: 132, height: 132 }} source={{ uri: image }} />
      <Text style={{ paddingTop: 10, fontWeight: "bold", fontSize: 10 }}>
        <Text>{name}</Text>
      </Text>
      <Text style={{ fontWeight: "bold" }}>₹{price}</Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 12,
          textDecorationLine: "line-through",
        }}
      >
        ₹{mrp}
      </Text>
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 10, color: COLORS.Positive }}
          >
            {parseInt(((mrp - price) / mrp) * 100)}%OFF
          </Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text style={{ fontSize: 10, color: COLORS.Positive }}>
            SAVED :<Text style={{ fontWeight: "bold" }}>₹ {mrp - price}</Text>
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <PrimaryButton filled={true} content={"BUY NOW"} />
      </View>
    </View>
  );
}
