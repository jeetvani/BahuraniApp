import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  BackHandler,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import CartProduct from "../../Components/Cart/CartProduct";
import PrimaryButton from "../../Components/PrimaryButton";
import { CouponData, fakeCategoryData } from "../../Constants/fakeData";
import HomeScreenLayout from "../../Components/HomeScreenCompoenents/HomeScreenLayout";
import ProductCard from "../../Components/Product/ProductCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { appStackScreens, bottomTabScreens } from "../../Constants/appScreens";
import checkAuth from "../../functions/checkAuth";
import { getAllCouponsAPI, getCartDataAPI } from "../../API/lib/user";
import { getPreferableProducts } from "../../API/lib/product";
import AnimatedLottieView from "lottie-react-native";
import PrimaryAuthHeader from "../../Components/Auth/PrimaryAuthHeader";
import DraggablePanel from "react-native-draggable-panel";
import axiosClient from "../../API/axiosClient";
export default function CartScreen() {
  const [mrpTotal, setMrpTotal] = useState(0);
  const [saved, setSaved] = useState(0);
  const [total, setTotal] = useState(0);
  const [AppliedCoupon, setAppliedCoupon] = useState("");
  const [PreferredProducts, setPreferredProducts] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [Data, setData] = useState([]);
  const [Coupons, setCoupons] = useState([]);
  const [OfferPanel, setOfferPanel] = useState(false);
  const [CouponValue, setCouponValue] = useState(0);
  const navigation = useNavigation();

  const getCoupons = () => {
    getAllCouponsAPI().then((response) => {
      setCoupons(response.data);
    });
  };

  const getCartData = async () => {
    
    checkAuth().then(async (response) => {
      if (response) {
        await getCartDataAPI()
          .then(async (response) => {
            console.log("Cart Data", response.data.data);
            const Data = response.data.data;

            setData(Data);
            setMrpTotal(response.data.mrpTotal);
            setSaved(response.data.saved);
            setTotal(response.data.total);
            await getPreferableProducts()
              .then((res) => {
                setPreferredProducts([]);
                console.log(res.data);
                setPreferredProducts(res.data.PreferableProducts);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log("Error", error);
                ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
              });
          })
          .catch((error) => {
            console.log("Error", error);
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
          });
      }
      if (!response) {
        navigation.navigate(bottomTabScreens.AccountScreen.name);
      }
    });
  };

  const validateCoupon = () => {
    axiosClient
      .post("/ValidateCoupon", {
        CouponId: AppliedCoupon,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setCouponValue(response.data.data[0].Value);
        } else {
          setCouponValue(0);
          ToastAndroid.show(response.data.msg, ToastAndroid.SHORT);
        }
      }).catch((error) => {
        console.log(error);
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        setCouponValue(0);
      });
  };

  const [subs, setSubs] = React.useState([]);
  React.useEffect(() => {
    setSubs([
      navigation.addListener("focus", () => {
        checkAuth().then((response) => {
          if (response) {
            getCartData().then(() => {
              getCoupons();
            });
          }
          if (!response) {
            navigation.navigate(bottomTabScreens.AccountScreen.name);
          }
        });
      }),
    ]);

    const unsubscribe = () => {
      navigation.removeAllListeners();
    };
    // Remove all listeners, because there have to be no listeners on unmounted screen
    return () => unsubscribe();
  }, []);

  const payment = () => {
    navigation.navigate(appStackScreens.FinalizeOrder.name, {
      amount: parseInt(total) - parseInt(CouponValue),
      saved: saved,
      CouponId: AppliedCoupon,
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray }}>
      <DraggablePanel
        visible={OfferPanel}
        closeOnTouchOutside={true}
        onRequestClose={() => setOfferPanel(false)}
        height={Dimensions.get("window").height - 100}
        containerStyle={{ backgroundColor: COLORS.white }}
        onDismiss={() => setOfferPanel(false)}
      >
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <FlatList
            data={Coupons}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setAppliedCoupon(item.CouponId);
                  setOfferPanel(false);
                }}
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  flexDirection: "row",
                  padding: 10,
                  borderWidth: 0.4,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    flex: 2,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {item.CouponId}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,

                      textAlign: "center",
                    }}
                  >
                    {item.Description}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                ></View>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          ></View>
        </View>
      </DraggablePanel>
      <ScreenHeader
        heading=" My Cart"
        cart={true}
        wishlistIcon={true}
        backButton={true}
        searchBar={false}
      />
      {!isLoading ? (
        Data.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                backgroundColor: COLORS.white,
              }}
            >
              <FlatList
                data={Data}
                renderItem={({ item }) => (
                  <View style={{ marginVertical: 10 }}>
                    <View style={styles.Container}>
                      <CartProduct
                        functionQuantityChange={getCartData}
                        ProductQuantity={item.Quantity}
                        ProductId={item.ProductId}
                        Variant={"40Kg"}
                        ImgSrc={item.Product_Image}
                        MRP={item.Product_Variants[0].mrp}
                        OurPrice={item.Product_Variants[0].ourPrice}
                        Name={item.Product_Name}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: COLORS.white,
              }}
            >
              <HomeScreenLayout
                leftText={"Apply Coupon"}
                rightText={"View All"}
                onPress={() => {
                  setOfferPanel(true);
                }}
              />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TextInput
                    onChangeText={(text) => {
                      setAppliedCoupon(text);
                    }} 
                    placeholder=" % Enter Coupon Code"
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 2,
                      borderBottomWidth: 0.4,
                      flex: 4,
                    }}
                  />

                  <TouchableOpacity 
                    onPress={validateCoupon}
                    
                  style={{ flex: 1, justifyContent: "flex-end" }}>
                    <Text
                      style={{
                        textAlign: "right",
                        fontWeight: "bold",
                        letterSpacing: 1,
                      }}
                    >
                      APPLY
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 12,color:COLORS.Positive }}>
                    {CouponValue == 0
                      ? ""
                      : AppliedCoupon + ` Applied ` +`₹`+CouponValue + " OFF "}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: COLORS.white,
              }}
            >
              <HomeScreenLayout
                leftText={"Frequently Bought Together"}
                rightText={"View All"}
                onPress={() => {
                  navigation.navigate(appStackScreens.ProductScreen.name);
                }}
              />
              <View style={{ marginVertical: 5 }}>
                <FlatList
                  horizontal
                  data={PreferredProducts}
                  renderItem={({ item }) => (
                    <ProductCard
                      addToCartFunction={getCartData}
                      Variants={item.Variants}
                      img={item.ProductImages[0]}
                      mrp={item.Variants[0].mrp}
                      ourPrice={item.Variants[0].ourPrice}
                      variant={item.Variants[0].name}
                      Images={item.ProductImages}
                      title={item.ProductName}
                      ProductId={item.ProductId}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: COLORS.white,
              }}
            >
              <HomeScreenLayout leftText={"Payment Details"} />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,

                  borderBottomWidth: 0.4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: "#818181",
                    }}
                  >
                    MRP Total
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: COLORS.black,
                    }}
                  >
                    ₹{mrpTotal}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,

                  borderBottomWidth: 0.4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: "#818181",
                    }}
                  >
                    Product Discount
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: COLORS.black,
                    }}
                  >
                    - ₹{parseInt(saved) + parseInt(CouponValue)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,

                  borderBottomWidth: 0.4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: "#818181",
                    }}
                  >
                    Delivery Charges
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: COLORS.black,
                    }}
                  >
                    ₹70
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,

                  borderBottomWidth: 0.4,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: COLORS.Positive,
                    }}
                  >
                    You Saved
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: COLORS.Positive,
                    }}
                  >
                    ₹{saved}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                    }}
                  >
                    Total Amount
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      paddingBottom: 5,
                      color: COLORS.black,
                    }}
                  >
                    ₹{total - CouponValue}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",

              backgroundColor: COLORS.white,
            }}
          >
            <AnimatedLottieView
              source={require("../../../assets/emptycart.json")}
              autoPlay
              style={{ height: Dimensions.get("screen").height * 0.6 }}
              loop={false}
            />
            <View
              style={{
                marginHorizontal: 30,
                top: Dimensions.get("screen").height * 0.003,
              }}
            >
              <PrimaryAuthHeader headText={"Your Cart is Empty"} />

              <PrimaryButton
                onPress={() => {
                  navigation.navigate("Bottomtab");
                }}
                content={"Continue Shopping"}
              />
            </View>
          </View>
        )
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <ActivityIndicator size={30} animating color={COLORS.primary} />
        </View>
      )}
      {Data.length > 0 ? (
        <View
          style={{
            paddingTop: 20,
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: "row" }}>
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
                ₹{total - CouponValue}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <PrimaryButton
                borderRadius={5}
                fontSize={14}
                onPress={payment}
                filled={true}
                content={"Place Order"}
              />
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.black,
    // elevation: 3,
    alignItems: "center",
    // shadowColor: COLORS.black,
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 2,
    // shadowRadius: 3,

    borderColor: COLORS.gray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});
