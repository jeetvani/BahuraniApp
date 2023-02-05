import RazorpayCheckout from "react-native-razorpay";
import axiosClient from "../axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../Constants/res/COLORS";

export async function getOrdersAPI() {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/getUserOrders", { UserId: UserId });
}
export async function createOrder(orderObj) {
  const userId = await AsyncStorage.getItem("userId");
  return axiosClient.post("/createOrder", {
    userId: userId,
    Quantity: orderObj.Quantity,
    VariantId: orderObj.VariantId,
    Address: orderObj.Address,
    ProductId: orderObj.ProductId,
    paymentMethod: orderObj.paymentMethod,
  });
}

export async function getOrders() {
  const userId = await AsyncStorage.getItem("userId");
  return axiosClient.post("/getOrders", {
    userId: userId,
  });
}

export async function CheckOutCart({ Address, PaymentMethod }) {
  const UserId = await AsyncStorage.getItem("UserId");
  console.log(UserId, Address, PaymentMethod);
  return axiosClient
    .post("/CheckOutCart", {
      UserId: UserId,
      Address: Address,
      PaymentMethod: PaymentMethod,
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
          return {
            status: 200,
            message: "Order Placed Successfully",
          };
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
                    return {
                      status: 200,
                      message: "Order Placed Successfully",
                    };
                  } else {
                    return {
                      status: 400,
                      message: "Payment Failed",
                    };
                  }
                });
            })
            .catch((error) => {
              // handle failure
              return {
                status: 400,
                message: error.message,
                code: error.code,
              };
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
