import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Image from "react-native-scalable-image";
import React, { useEffect, useState } from "react";
import ScreenHeader from "../../Components/ScreenHeader";
import SearchBar from "../../Components/SearchBar";
import Banner from "../../Components/Banner";
import { COLORS } from "../../Constants/res/COLORS";
import HomeScreenLayout from "../../Components/HomeScreenCompoenents/HomeScreenLayout";
import { appStackScreens, bottomTabScreens } from "../../Constants/appScreens";
import { useNavigation } from "@react-navigation/native";
import CategoryCard from "../../Components/Category/CategoryCard";
import { fakeCategoryData } from "../../Constants/fakeData";
import ProductCard from "../../Components/Product/ProductCard";
import {
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import OfferBanner from "../../Components/HomeScreenCompoenents/OfferBanner";
import { getProducts } from "../../API/lib/user";
import { getCategories, getPreferableProducts } from "../../API/lib/product";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
export default function HomeScreen() {

  const [preferableProducts, setPreferableProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    getPreferableProducts().then((res) => {
      console.log(res.data);
      setPreferableProducts(res.data.PreferableProducts);
      setisLoading(false);
    });
    getCategories()
      .then((res) => {
        console.log(res.data);
        //get first 6 categories
        if (res.data.length > 6) {
          setCategories(res.data.slice(0, 6));
        } else {
          setCategories(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [Categories, setCategories] = useState([]);
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScreenHeader
        onSearchFocus={() => {
          navigation.navigate(appStackScreens.ProductScreen.name);
        }}
        searchBar
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 15 }}>
          <Banner />
        </View>
        <View style={{ marginTop: 15, marginHorizontal: 20 }}>
          <HomeScreenLayout
            leftText={"Your Favorite Picks"}
            rightText={"See All >"}
            onPress={() => {
              navigation.navigate(appStackScreens.ProductScreen.name);
            }}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          {isLoading ? (
            <View>
              <SkeletonPlaceholder>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: 130,
                      height: 160,
                      borderRadius: 10,
                      marginHorizontal: 10,
                    }}
                  />
                  <View
                    style={{
                      width: 130,
                      height: 160,
                      borderRadius: 10,
                      marginHorizontal: 10,
                    }}
                  />
                  <View
                    style={{
                      width: 130,
                      height: 160,
                      borderRadius: 10,
                      marginHorizontal: 10,
                    }}
                  />
                </View>
              </SkeletonPlaceholder>
            </View>
          ) : (
            <FlatList
              horizontal
              data={preferableProducts}
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
          )}
        </View>
        <View style={{ marginVertical: 5, marginHorizontal: 20 }}>
          <HomeScreenLayout
            rightText={"See All >"}
            leftText={"Shop By Category"}
            onPress={() => {
              navigation.navigate(bottomTabScreens.CategoryScreen.name);
            }}
          />
          <FlatList
            numColumns={3}
            data={Categories}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 10,
                  flex: 0.5,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(appStackScreens.ProductScreen.name, {
                      CategoryId: item.CategoryId,
                      CategoryName: item.CategoryName,
                    });
                  }}
                >
                  <View>
                    <Image source={{ uri: item.CategoryImage }} width={75} />
                    <Text
                      numberOfLines={2}
                      style={{
                        paddingVertical: 4,
                        fontWeight: "bold",
                        width: 80,
                        textAlign: "center",
                        fontSize: 12,
                      }}
                    >
                      {item.CategoryName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

          <View>
            <HomeScreenLayout leftText={"Featured For You"} />
          </View>
        </View>
        <View style={{ paddingBottom: 15 }}>
          <OfferBanner />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  layoutContainer: {
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: 30,
    borderTopWidth: 0,
    borderColor: COLORS.primary,
    borderBottomWidth: 0,
    padding: 10,
    marginVertical: 5,
  },
});
