import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Clipboard
} from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";

import { FontAwesome } from "@expo/vector-icons";
import * as Data from "../../Constants/fakeData";
export default function Coupons() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader heading={"Your Coupons"} />
      <ScrollView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Data.CouponData}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: COLORS.white,
                borderRadius: 5,
                borderColor: COLORS.primary,
                paddingVertical: 20,
                elevation: 10,
                shadowColor: COLORS.black,
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <View style={{ flex: 4 }}>
               
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.black,
                  }}
                >
                  {item.couponCode}
                </Text>
                <Text
                  style={{
                    color: COLORS.black,
                    paddingVertical: 5,
                  }}
                >
                  {item.description}
                </Text>
                <Text
                  style={{
                    color: COLORS.Positive,
                    paddingVertical: 5,
                    fontSize:16
                    

                  }}
                >
                  {item.value}
                </Text>
                <Text
                  style={{
                    color: item.status === "Active" ? COLORS.Positive : COLORS.primary,
                    paddingVertical: 5,
                    fontSize:16
                    

                  }}
                >
                  {item.status}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>
                  <TouchableOpacity
                    onPress={() => {
                     Clipboard.setString(item.couponCode);
                    }}
                  >
                    <FontAwesome name="clipboard" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                  {"  "}
               
                  
                </Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
