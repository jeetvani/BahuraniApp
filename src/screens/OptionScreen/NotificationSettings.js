import { View, Text, ScrollView, Switch } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";

export default function NotificationSettings() {
  const [OrderNotify, setOrderNortify] = useState(false);
  const [ProductNotify, setProductNortify] = useState(false);
  const [OfferNotify, setOfferNortify] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <ScreenHeader heading={"Notification Settings"} backButton />
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            flexDirection: "row",
            borderWidth: 0.4,
            borderColor: COLORS.black,
            padding: 10,
            borderRadius: 5,
            marginVertical:10
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Orders & Delivery
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Switch
            thumbColor={COLORS.white}
            value={OrderNotify}
              onValueChange={() => {
                OrderNotify ? setOrderNortify(false) : setOrderNortify(true);
              }}
              
              trackColor={{false: '#767577', true: COLORS.primary}}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            flexDirection: "row",
            borderWidth: 0.4,
            borderColor: COLORS.black,
            padding: 10,
            borderRadius: 5,
            marginVertical:10
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              New Products
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Switch
            thumbColor={COLORS.white}
            value={ProductNotify}
              onValueChange={() => {
                ProductNotify ? setProductNortify(false) : setProductNortify(true);
              }}
              
              trackColor={{false: '#767577', true: COLORS.primary}}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 10,
            flexDirection: "row",
            borderWidth: 0.4,
            borderColor: COLORS.black,
            padding: 10,
            borderRadius: 5,
            marginVertical:10
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              New Offers & Deals
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Switch
            thumbColor={COLORS.white}
            value={OfferNotify}
              onValueChange={() => {
                OfferNotify ? setOfferNortify(false) : setOfferNortify(true);
              }}
              
              trackColor={{false: '#767577', true: COLORS.primary}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
