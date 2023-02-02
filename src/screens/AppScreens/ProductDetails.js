import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import ScreenHeader from "../../Components/ScreenHeader";
import { COLORS } from "../../Constants/res/COLORS";
import ProductDetailsBanner from "../../Components/Product/ProductDetailsBanner";
import PrimaryButton from "../../Components/PrimaryButton";
import ProductCard from "../../Components/Product/ProductCard";
import HomeScreenLayout from "../../Components/HomeScreenCompoenents/HomeScreenLayout";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addToCartAPI,
  checkProductInCartAPI,
  decreaseProductQuantityAPI,
  deleteProductFromCartAPI,
  getPreferableProducts,
  getProductById,
  increaseProductQuantityAPI,
} from "../../API/lib/product";
import checkAuth from "../../functions/checkAuth";
import {
  bottomTabScreens,
} from "../../Constants/appScreens";
export default function ProductDetails({ route }) {
  const navigation = useNavigation();
  const ProductId = route.params.ProductId;
  const [Quantity, setQuantity] = useState(1);
  const [PrefferableProducts, setPrefferableProducts] = useState([]);
  const [Expanded, setExpanded] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [IsExitsInCart, setIsExitsInCart] = useState(false);
  const [ProductName, setProductName] = useState("");
  const [SelectedVariant, setSelectedVariant] = useState();
  const [ProductDescription, setProductDescription] = useState("");
  const [Variants, setVariants] = useState([]);
  const [ProductImages, setProductImages] = useState([]);
  const IncreaseProductQuantity = () => {
    increaseProductQuantityAPI({
      ProductId: ProductId,
    }).then((response) => {
      console.log(response.data);
      if (response.data.status == 200) {
        setQuantity(parseInt(Quantity) + 1);
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    });
  };

  const DecreaseProductQuantity = () => {
    if (Quantity > 1) {
      decreaseProductQuantityAPI({
        ProductId: ProductId,
      })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == 200) {
            setQuantity(parseInt(Quantity) - 1);
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          }
        })
        .catch((err) => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
    if (Quantity == 1) {
      setIsExitsInCart(false);
      deleteProductFromCartAPI({
        ProductId: ProductId,
      }).then((response) => {
        console.log(response.data);
        if (response.data.status == 200) {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          setIsExitsInCart(false);
        } else {
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        }
      });
    }
  };
  const addToCart = () => {
    checkAuth().then((res) => {
      if (res) {
        addToCartAPI({
          ProductId: ProductId,
          VariantId: SelectedVariant.id,
          Quantity: 1,
        }).then((response) => {
          console.log(response.data);
          if (response.data.status == 200) {
            setIsExitsInCart(true);
          }
          //if status 400 show toast
          if (response.data.status == 400) {
            //show toast
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          }
        });
      } else {
        navigation.navigate(bottomTabScreens.AccountScreen.name);
      }
    });
  };

  const unsubscribe = navigation.addListener("focus", async () => {
    await getProductById(ProductId).then(async (res) => {
      const ProductName = res.data[0].ProductName;
      setProductName(ProductName);
      setVariants(res.data[0].Variants);
      setSelectedVariant(res.data[0].Variants[0]);
      setProductDescription(res.data[0].ProductDescription);
      setProductImages(res.data[0].ProductImages);

      await getPreferableProducts().then((res) => {
        setPrefferableProducts(res.data.PreferableProducts);
      });
    });

    await checkAuth().then((res) => {
      if (res) {
        checkProductInCartAPI(ProductId)
          .then((response) => {
            console.log(response.data);
            if (response.data.status == 100) {
              setIsExitsInCart(true);
              setQuantity(response.data.quantity);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    setisLoading(false);

    return unsubscribe;
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader />
      {!isLoading ? (
        <ScrollView>
          <View style={{ flexDirection: "row", margin: 20 }}>
            <Text style={{ fontSize: 14, color: COLORS.black }}>
              <FontAwesome name="star" size={14} color={COLORS.primary} />
              <FontAwesome name="star" size={14} color={COLORS.primary} />
              <FontAwesome name="star" size={14} color={COLORS.primary} />
              <FontAwesome name="star" size={14} color={COLORS.primary} />
              <FontAwesome
                name="star-half-empty"
                size={14}
                color={COLORS.primary}
              />
            </Text>
          </View>
          <ProductDetailsBanner Images={ProductImages} />
          <View style={{ marginHorizontal: 30 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
              {ProductName}
            </Text>
            <Text style={{ color: COLORS.black, fontSize: 24 }}>
              ₹{""}
              {SelectedVariant.ourPrice}
            </Text>
            <Text style={{ fontSize: 16, color: COLORS.Positive }}>
              <Text
                style={{ textDecorationLine: "line-through", color: "#978E8E" }}
              >
                ₹{SelectedVariant.mrp}
              </Text>
              {"  "} -
              {parseInt(
                ((SelectedVariant.mrp - SelectedVariant.ourPrice) /
                  SelectedVariant.mrp) *
                  100
              )}
              %
            </Text>
          </View>
          <View style={{ marginHorizontal: 30, marginVertical: 15 }}>
            <FlatList
              horizontal
              data={Variants}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedVariant(item);
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        SelectedVariant.id == item.id
                          ? COLORS.primary
                          : COLORS.white,
                      marginHorizontal: 4,
                      alignItems: "center",
                      paddingHorizontal: 25,
                      paddingVertical: 2,
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor:
                        SelectedVariant.id == item.id
                          ? COLORS.white
                          : COLORS.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color:
                          SelectedVariant.id == item.id
                            ? COLORS.white
                            : COLORS.primary,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color:
                          SelectedVariant.id == item.id
                            ? COLORS.white
                            : COLORS.primary,
                      }}
                    >
                      ₹{item.ourPrice}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            {/*Show Ratings of Product using stars and font-awesome */}

            <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
              About this Product
            </Text>
            <Text numberOfLines={!Expanded ? 3 : null} style={{ fontSize: 14 }}>
              {ProductDescription}{" "}
            </Text>
            {!false ? (
              <Text
                onPress={() => {
                  setExpanded(Expanded ? false : true);
                }}
                style={{
                  color: "#5094E7",
                }}
              >
                {!Expanded ? "Read More..." : "Show Less"}{" "}
              </Text>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <HomeScreenLayout
                leftText={"Frequently Bought Together"}
                rightText={"View All"}
              />
              <View style={{ marginVertical: 5 }}>
                <FlatList
                  horizontal
                  data={PrefferableProducts}
                  renderItem={({ item }) => (
                    <ProductCard
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
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={30} color={COLORS.primary} />
        </View>
      )}
      {isLoading ? null : (
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: "row",
            paddingVertical: 10,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            {IsExitsInCart ? (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                }}
              >
                <TouchableOpacity
                  onPress={DecreaseProductQuantity}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 5,
                    borderRightWidth: 1,
                    borderColor: COLORS.primary,
                  }}
                >
                  <FontAwesome name="minus" color={COLORS.primary} size={18} />
                </TouchableOpacity>
                <View style={{ flex: 4, alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLORS.primary,
                      fontWeight: "bold",
                    }}
                  >
                    <Text>{Quantity}</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={IncreaseProductQuantity}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 5,
                    borderLeftWidth: 1,
                    borderColor: COLORS.primary,
                  }}
                >
                  <FontAwesome name="plus" color={COLORS.primary} size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <PrimaryButton
                onPress={addToCart}
                filled
                content={"Add to Cart"}
                fontSize={14}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
