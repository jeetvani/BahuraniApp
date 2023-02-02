import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import ScreenHeader from "../../Components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { getCategoryProducts } from "../../API/lib/product";
import { getProducts } from "../../API/lib/user";
import { COLORS } from "../../Constants/res/COLORS";
import ProductCard from "../../Components/Product/ProductCard";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
var DataArray = [];
export default function ProductScreen({ route }) {
  const navigation = useNavigation();
  const params = route.params;
  const [Data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const unsubscribe = navigation.addListener("focus", () => {
    if (params) {
      //Check Weather Category Id is passed or not
      if (params.CategoryId) {
        console.log(`Category Id is ${params.CategoryId} `);
        //If Category Id is passed then get all products of that category
        getCategoryProducts(params.CategoryId).then((res) => {
          console.log(res.data);
          setData(res.data);
          DataArray = res.data;
          setisLoading(false);
        });
      }
    }
    //If Category Id is not passed then get all products
    else {
      console.log("No Category Id Passed");
      getProducts().then((res) => {
        console.log(res.data);
        setData(res.data);
        DataArray = res.data;
        setisLoading(false);
      });
    }
  });
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader
        autoFocus={true}
        searchBar
        onSearch={(keyword) => {
          console.log(`Keyword is ${keyword}`);
          //Filter Data according to search query
          const result = DataArray.filter((obj) => {
            return obj.ProductName.toLowerCase().includes(
              keyword.toLowerCase()
            );
          });
          setData(result);
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 30,
              }}
            >
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
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={Data}
          
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 20,
                   alignItems:'space-between'
                  }}
                >
                  <ProductCard
                    Variants={item.Variants}
                    variant={item.Variants[0].name}
                    title={item.ProductName}
                    img={item.ProductImages[0]}
                    mrp={item.Variants[0].mrp}
                    ourPrice={item.Variants[0].ourPrice}
                    ProductId={item.ProductId}
                  />
                </View>
              );
            }}
          />
        )}
      </ScrollView>
    </View>
  );
}
