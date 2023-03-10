import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import { fakeCategoryData } from "../../Constants/fakeData";
import WishlistCard from "../../Components/Wishlist/WishlistCard";
import checkAuth from "../../functions/checkAuth";
import { bottomTabScreens } from "../../Constants/appScreens";
import { useNavigation } from "@react-navigation/native";
import { getWishlistDataAPI } from "../../API/lib/user";
import {
  decreaseProductQuantityAPI,
  increaseProductQuantityAPI,
} from "../../API/lib/product";
import PrimaryButton from "../../Components/PrimaryButton";
import PrimaryAuthHeader from "../../Components/Auth/PrimaryAuthHeader";
import AnimatedLottieView from "lottie-react-native";
export default function Wishlist() {
  const [WishlistData, setWishlistData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();

  const [subs, setSubs] = React.useState([]);
  React.useEffect(() => {
    setSubs([
      navigation.addListener("focus", () => {
        checkAuth().then((response) => {
          if (response) {
            setIsLoading(true);
            getWishlistData();
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

  const getWishlistData = async () => {
    getWishlistDataAPI().then((response) => {
      if (response.data.status === 200) {
        console.log("Wishlist Data");
        console.log(response.data.Wishlist);
        setWishlistData(response.data.Wishlist);
        setIsLoading(false);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : WishlistData.length === 0 ? (
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
            style={{ height: Dimensions.get("screen").height * 0.5 }}
            loop={false}
          />
          <View
            style={{
              marginHorizontal: 30,
              top: Dimensions.get("screen").height * 0.003,
            }}
          >
            <PrimaryAuthHeader headText={"Your Wishlist is Empty"} />

            <PrimaryButton
              onPress={() => {
                navigation.navigate(bottomTabScreens.HomeScreen.name);
              }}
              content={"Continue Shopping"}
            />
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={{ marginVertical: 5 }}>
              <FlatList
                data={WishlistData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.Container}>
                    <WishlistCard
                      functionQuantityChange={getWishlistData}
                      ProductId={item.Product_Id}
                      ImgSrc={item.Product_Status.Image}
                      MRP={parseInt(item.Product_Status.Product_Variants.mrp)}
                      ItemInCart={item.Product_Status.exitsInCart}
                      ProductQuantity={
                        item.Product_Status.exitsInCart
                          ? item.Product_Status.quantity
                          : 0
                      }
                      OurPrice={parseInt(
                        item.Product_Status.Product_Variants.ourPrice
                      )}
                      Variant={item.Product_Status.Product_Variants.name}
                      Name={item.Product_Status.name}
                      VariantId={item.Product_Status.Product_Variants.id}
                    />
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </ScrollView>
      )}
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
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
});
