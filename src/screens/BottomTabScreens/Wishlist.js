import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import { fakeCategoryData } from "../../Constants/fakeData";
import WishlistCard from "../../Components/Wishlist/WishlistCard";
import checkAuth from "../../functions/checkAuth";
import { bottomTabScreens } from "../../Constants/appScreens";
import { useNavigation } from "@react-navigation/native";
export default function Wishlist() {
  const [WishlistData, setWishlistData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();

  const getWishlistData = async () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const unsubscribe = navigation.addListener("focus", () => {
    checkAuth().then((response) => {
      if (response) {
        console.log("User logged in");
        getWishlistData();
      }
      if (!response) {
        navigation.navigate(bottomTabScreens.AccountScreen.name);
      }
    });

    return unsubscribe;
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
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
                data={fakeCategoryData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.Container}>
                    <WishlistCard
                      ImgSrc={item.image}
                      MRP={item.mrp}
                      OurPrice={item.ourPrice}
                      Variant={item.numberOfItems}
                      Name={item.name}
                      itemInCart={item.itemInCart}
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
    marginVertical: 10,
    elevation: 2,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 2,
    shadowRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: COLORS.primary,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    marginHorizontal: 0,
  },
});
