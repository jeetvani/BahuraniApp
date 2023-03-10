import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Image from "react-native-scalable-image";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { appStackScreens, bottomTabScreens } from "../../Constants/appScreens";
import checkAuth from "../../functions/checkAuth";
import {
  addToCartAPI,
  checkProductInCartAPI,
  decreaseProductQuantityAPI,
  deleteProductFromCartAPI,
  increaseProductQuantityAPI,
} from "../../API/lib/product";
export default function ProductCard({
  img,
  title,
  ourPrice,
  mrp,
  onPress,
  variant,
  Variants,
  Images,
  ProductId,
  addToCartFunction,
}) {
  const navigation = useNavigation();

  const unsubscribe = navigation.addListener("focus", () => {
    checkProductInCart();
    return unsubscribe;
  });

  useEffect(() => {
    checkProductInCart();
  }, []);

  const [isInCart, setIsInCart] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [ProcessRunning, setProcessRunning] = React.useState(false);
  const route = useRoute();

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
          checkProductInCart();
          if (route.name == "CartMain") {
            addToCartFunction();
          }
        }
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        setProcessRunning(false);
      });
  };

  const DecreaseProductQuantity = async () => {
    setProcessRunning(true);
    if (quantity > 1) {
      await decreaseProductQuantityAPI({
        ProductId: ProductId,
      })
        .then(async (response) => {
          console.log(response.data);
          if (response.data.status == 200) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            checkProductInCart();
            setProcessRunning(false);
            if (route.name == "CartMain") {
              addToCartFunction();
            }
          }
        })
        .catch((err) => {
          setProcessRunning(false);
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
    if (quantity == 1) {
      await deleteProductFromCartAPI({
        ProductId: ProductId,
      })
        .then(async (response) => {
          console.log(response.data);

          if (response.data.status == 200) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            setProcessRunning(false);
            checkProductInCart();
            if (route.name == "CartMain") {
              addToCartFunction();
            }
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

  const checkProductInCart = () => {
    checkAuth().then((res) => {
      if (res) {
        checkProductInCartAPI(ProductId).then((res) => {
          if (res.data.status == 100) {
            setIsInCart(true);
            setQuantity(res.data.quantity);
          } else {
            setIsInCart(false);
          }
        });
      }
    });
  };

  const addToCart = () => {
    //if user is not logged in then navigate to login screen
    //else add to cart
    checkAuth().then((res) => {
      if (res) {
        addToCartAPI({
          ProductId,
          VariantId: Variants[0].id,
          Quantity: 1,
        })
          .then((response) => {
            if (response.data.status == 200) {
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
              checkProductInCart();
              console.log(route.name);
              if (route.name == "CartMain") {
                addToCartFunction();
              }
            }
            if (response.data.status == 400) {
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            }
          })
          .catch((err) => {
            console.log(err);
            ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
          });
      } else {
        navigation.navigate(bottomTabScreens.AccountScreen.name);
      }
    });
  };
  return (
    <View style={{ flex: 0.5 }}>
      <View style={styles.Container}>
        <TouchableWithoutFeedback
          onPress={() => {
            onPress
              ? onPress()
              : navigation.navigate(appStackScreens.ProductDetails.name, {
                  ProductId,
                });
          }}
          style={{ alignItems: "center" }}
        >
          <Image source={{ uri: img }} height={90} />
          <View style={{ position: "absolute", left: 100 }}>
            <Text style={{ bottom: 10 }}>
              <FontAwesome name="circle" size={30} color={COLORS.primary} />
            </Text>
            <Text style={styles.discountStyle}>
              {parseInt(((mrp - ourPrice) / mrp) * 100)}%
            </Text>
          </View>
          <Text numberOfLines={2} style={styles.titleStyle}>
            {title}
          </Text>
        </TouchableWithoutFeedback>

        <Text style={{ fontSize: 10, color: COLORS.black, paddingTop: 4 }}>
          {variant}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 4 }}>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                textDecorationLine: "line-through",
                fontSize: 10,
                color: "#B0A7A7",
              }}
            >
              ??? {mrp}
            </Text>
            <Text
              style={{
                fontSize: 12,
                paddingTop: 3,
                fontWeight: "bold",
              }}
            >
              ??? {ourPrice}
            </Text>
          </View>
          <View style={{ flex: 3, alignItems: "flex-end" }}>
            {isInCart ? (
              <View style={styles.counter}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={DecreaseProductQuantity}
                    disabled={ProcessRunning}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text>
                      <FontAwesome
                        name="minus"
                        color={COLORS.primary}
                        size={10}
                      />
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text>
                      <Text style={{ color: COLORS.primary }}>{quantity}</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    disabled={ProcessRunning}
                    onPress={IncreaseProductQuantity}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 5,
                    }}
                  >
                    <Text>
                      <FontAwesome
                        name="plus"
                        color={COLORS.primary}
                        size={10}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                onPress={addToCart}
                style={styles.addToCartButtonContainer}
              >
                <Text style={{ paddingVertical: 3 }}>
                  <Ionicons name="add" color={COLORS.primary} size={18} />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: COLORS.black,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: COLORS.gray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  discountStyle: {
    bottom: 32,
    fontSize: 10,
    left: 4,
    color: COLORS.white,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 4,
    width: 100,
    height: 40,
  },
  addToCartButtonContainer: {
    backgroundColor: COLORS.black,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 3,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  counter: {
    backgroundColor: COLORS.black,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 3,
    width: 60,
    justifyContent: "center",
    borderColor: COLORS.gray,
    left: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});
