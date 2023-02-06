import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";

import HomeScreenLayout from "../../Components/HomeScreenCompoenents/HomeScreenLayout";
import { Addresses, paymentMethods } from "../../Constants/fakeData";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../../Components/PrimaryButton";
import { CheckOutCart, createOrder } from "../../API/lib/orders";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";
import { getUserAddress } from "../../API/lib/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../API/axiosClient";
import RazorpayCheckout from "react-native-razorpay";
export default function FinalizeOrder({ route }) {
  const amount = route.params.amount;
  const saved = route.params.saved;
  const navigation = useNavigation();
  const [SelectedAddress, setSelectedAddress] = useState(false);
  const [PaymentMethod, setPaymentMethod] = useState(false);
  const [Processing, setProcessing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [Address, setAddress] = useState([]);
  const unsubscribe = navigation.addListener("focus", async () => {
    await getUserAddress().then((res) => {
      console.log(res.data);
      if (res.status == 200) {
        setAddress(res.data.Addresses);
      }
      if (res.error) {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
      setLoading(false);
    });
    return unsubscribe;
  });
  const proceedToPayment = async () => {
    if (!SelectedAddress || !PaymentMethod) {
      alert("Please Select Address and Payment Method");
    } else {
      setProcessing(true);
      const UserId = await AsyncStorage.getItem("UserId");
      console.log(UserId, Address, PaymentMethod);
      await axiosClient
        .post("/CheckOutCart", {
          UserId: UserId,
          Address: JSON.stringify(Address),
          PaymentMethod:
            PaymentMethod == 1 ? "Cash On Delivery" : "Online Payment",
          CouponId: route.params.CouponId,
        })
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          if (data.status == 200) {
            console.log(`Creating Order ${data.order_id}}`);

            var options = {
              description: `Payment for Order ${data.order_id}}`,
              image: "https://i.ibb.co/hyvbSRh/Logo.jpg",
              currency: "INR",
              key: "rzp_test_EJQQA3DkmlB0p9",
              amount: data.amount,
              name: "Bahurani Brand",
              order_id: data.order_id,
              prefill: {
                email: "bahuranitech@gmail.com",
                contact: "9191919191",
                name: "Gaurav Kumar",
              },
              theme: { color: COLORS.primary },
              readonly: {
                contact: true,
                email: true,
              },
            };

            if (data.PaymentMethod == "Cash On Delivery") {
              navigation.navigate(appStackScreens.OrderSuccess.name, {
                saved: saved,
              });
            } else {
              RazorpayCheckout.open(options)
                .then((data) => {
                  const order_id = data.razorpay_order_id;
                  const payment_id = data.razorpay_payment_id;
                  return axiosClient
                    .post("/verifyPayment", {
                      order_id: order_id,
                      payment_id: payment_id,
                    })
                    .then((res) => {
                      console.log(res.data);
                      if (res.data.status == 200) {
                        navigation.navigate(appStackScreens.OrderSuccess.name, {
                          saved: saved,
                        });
                        return {
                          status: 200,
                          message: "Order Placed Successfully",
                        };
                      } else {
                        ToastAndroid.show("Payment Failed", ToastAndroid.SHORT);
                        navigation.navigate(appStackScreens.CartScreen.name);
                        return {
                          status: 400,
                          message: "Payment Failed",
                        };
                      }
                    });
                })
                .catch((error) => {
                  console.log(error);
                  // handle failure
                  ToastAndroid.show("Payment Failed", ToastAndroid.SHORT);
                });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("Something Went Wrong", ToastAndroid.SHORT);
        })
        .finally(() => {
          setProcessing(false);
        });
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView>
        <View style={{ marginHorizontal: 25 }}>
          <HomeScreenLayout
            leftText={"Select Delivery Address"}
            rightText={"Add New Address"}
            onPress={() => {
              navigation.navigate(appStackScreens.AddAddress.name, {
                edit: false,
              });
            }}
          />
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={Address}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedAddress(item.Address_Id)}
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    padding: 5,
                    borderWidth: SelectedAddress == item.Address_Id ? 1 : 0.4,
                    borderRadius: 5,
                    borderColor:
                      SelectedAddress == item.Address_Id
                        ? COLORS.black
                        : COLORS.black,
                  }}
                >
                  <View style={{ flex: 4, paddingHorizontal: 4 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color:
                          SelectedAddress == item.Address_Id
                            ? COLORS.black
                            : COLORS.black,
                      }}
                    >
                      {item.Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color:
                          SelectedAddress == item.Address_Id
                            ? COLORS.black
                            : COLORS.black,
                      }}
                    >
                      {item.PhoneNumber}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,

                        color:
                          SelectedAddress == item.Address_Id
                            ? COLORS.black
                            : COLORS.black,
                      }}
                    >
                      {item.Address}
                    </Text>
                    <Text
                      style={{
                        color:
                          SelectedAddress == item.Address_Id
                            ? COLORS.black
                            : COLORS.black,
                      }}
                    >
                      {item.PinCode}
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
                      <Ionicons
                        name={
                          SelectedAddress == item.Address_Id
                            ? "ios-radio-button-on"
                            : "ios-radio-button-off"
                        }
                        size={16}
                        color={
                          SelectedAddress == item.Address_Id
                            ? COLORS.primary
                            : COLORS.black
                        }
                      />
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: 25, marginTop: 30 }}>
          <HomeScreenLayout leftText={"Select Payment Method"} />
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={paymentMethods}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setPaymentMethod(item.id)}
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    padding: 8,
                    borderWidth: PaymentMethod == item.id ? 1 : 0.4,
                    borderRadius: 5,
                    borderColor:
                      PaymentMethod == item.id ? COLORS.black : COLORS.black,
                      
                  }}
                >
                  <View style={{ flex: 4 }}>
                    <Text
                      style={{
                        fontSize: 16,

                        color:
                          PaymentMethod == item.id
                            ? COLORS.black
                            : COLORS.black,
                      }}
                    >
                      {item.name}
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
                      <Ionicons
                        size={16}
                        name={ PaymentMethod==item.id?"ios-radio-button-on":"ios-radio-button-off"}
                        color={
                          PaymentMethod == item.id
                            ? COLORS.primary
                            : COLORS.black
                        }
                      />
                    </Text>
                  </View>
            
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 30,
          bottom: 10,
          marginVertical: 10,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12 }}>Payable Amount</Text>
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.black,
              paddingVertical: 4,
              fontSize: 16,
            }}
          >
            ₹{amount}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <PrimaryButton
            borderRadius={5}
            onPress={proceedToPayment}
            fontSize={15}
            buttonHeight={40}
            isLoading={Processing}
            filled={true}
            content={PaymentMethod == 1 ? "Place Order" : "Pay Now"}
          />
        </View>
      </View>
    </View>
  );
}
