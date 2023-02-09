import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import * as Data from "../../Constants/fakeData";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";
import PrimaryButton from "../../Components/PrimaryButton";
import Image from "react-native-scalable-image";
import { AirbnbRating } from "react-native-ratings";
import { getOrdersAPI } from "../../API/lib/orders";
export default function Orders({ route }) {
  const [isLoading, setisLoading] = useState(true);
  const [OrderData, setOrderData] = useState([]);
  const getUserOrders = async () => {
    getOrdersAPI().then((response) => {
      const data = response.data.OrderData[0].Order_Data;

      setOrderData(response.data.OrderData);
    });
  };

  const navigation = useNavigation();
  const unsubscribe = navigation.addListener("focus", () => {
    getUserOrders();

    setisLoading(false);
    return unsubscribe;
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader backButton heading={"Your Orders"} />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={30} color={COLORS.primary} animating />
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
          <View style={{ marginTop: 10 }}>
            <FlatList
            style={{
              marginBottom:40
            }}
              showsVerticalScrollIndicator={false}
              data={OrderData}
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
                      {item.Order_Id}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,

                        color: COLORS.black,
                      }}
                    >
                      {item.Address[0].Address}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,

                        color: COLORS.black,
                      }}
                    >
                      {item.Address[0].PinCode  }
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
paddingVertical:4,
                        color: COLORS.black,
                      }}
                    >
                    Ordered On : {item.OrderDate}
                    </Text>
                  
                    <FlatList
                      data={item.Order_Data}
                      renderItem={({ item }) => (
                        <View style={{ marginVertical:3 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.ProductData.ProductName} x{" "}
                            {item.ProductData.Quantity} (₹{""}
                            {item.ProductData.ourPrice *
                              item.ProductData.Quantity}
                            )
                          </Text>
                        </View>
                      )}
                    />

                    <Text
                      style={{
                        paddingVertical: 5,
                        fontSize: 16,
                        color:
                          item.Status == "Delivered"
                            ? COLORS.Positive
                            : COLORS.Yellow,
                      
                          }}
                      
                    >
                      {item.Status == "Delivered"
                        ? `Delivered on ${item.OrderDate}`
                        : item.Status}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1.5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FlatList
                      data={item.Order_Data}
                      numColumns={2}
                      renderItem={(element) => (
                        <View
                          style={{
                            marginHorizontal: 5,
                            marginVertical: 5,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            width={60}
                            height={60}
                            source={{
                              uri: element.item.ProductData.ProductImage,
                            }}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}
