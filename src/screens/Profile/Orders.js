import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import * as Data from "../../Constants/fakeData";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";
import PrimaryButton from "../../Components/PrimaryButton";
import Image from "react-native-scalable-image";
import { AirbnbRating } from "react-native-ratings";
export default function Orders() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader backButton heading={"Your Orders"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View style={{ marginTop: 10 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data.fakeOrderData}
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
                  <View style={{ flex: 2 }}>
                    <Text
                      style={{
                        fontSize: 18,

                        color: COLORS.black,
                      }}
                    >
                      {item.orderId}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        paddingVertical: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {item.Product_Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,

                        color: COLORS.black,
                      }}
                    >
                      {item.Address}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}
                    >
                      {item.ourPrice}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}
                    >
                      {item.orderDate}
                    </Text>
                    <Text
                      style={{
                        paddingVertical: 5,
                        color:
                          item.orderStatus == "Delivered"
                            ? COLORS.Positive
                            : COLORS.Yellow,
                      }}
                    >
                      {item.orderStatus == "Delivered"
                        ? `Delivered on ${item.orderDate}`
                        : item.orderStatus}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image source={{ uri: item.image }} width={100} />
                    <View>
                      {item.orderStatus == "Delivered" ? (
                        <View >
                          <AirbnbRating
                            onFinishRating={(rating) => {
                              console.log(rating);
                            }}
                            size={15}
                            reviews={false}
                            reviewSize={1}
                            count={5}
                            selectedColor={COLORS.primary}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
