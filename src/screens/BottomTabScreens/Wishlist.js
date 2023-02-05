import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
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
export default function Wishlist() {
  const [WishlistData, setWishlistData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();

  const getWishlistData = async () => {
    getWishlistDataAPI().then((response) => {
      if (response.data.status === 200) {
        setWishlistData(response.data.Wishlist);
        setIsLoading(false);
      }
    });
  };

  const unsubscribe = navigation.addListener("focus", () => {
    checkAuth().then((response) => {
      if (response) {
        getWishlistData();
      }
      if (!response) {
        navigation.navigate(bottomTabScreens.AccountScreen.name);
      }
    });

    return unsubscribe;
  },[navigation]);

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
        <View>
          <Text>No items in wishlist</Text>
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
                          ? parseInt(item.Product_Status.quantity)
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
