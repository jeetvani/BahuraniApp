import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import ScreenHeader from "../../Components/ScreenHeader";
import { fakeCategoryData } from "../../Constants/fakeData";
import CategoryscreenCard from "../../Components/Category/CategoryscreenCard";
import { COLORS } from "../../Constants/res/COLORS";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../../API/lib/product";
import { appStackScreens } from "../../Constants/appScreens";

export default function CategoryScreen() {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const unsubscribe = navigation.addListener("focus", () => {
    setLoading(true);
    getCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return unsubscribe;
  });
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader searchBar />
      <View style={{ marginHorizontal: 10, marginTop: 20, flex: 1 }}>
        {Loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={30} color={COLORS.primary} />
          </View>
        ) : (
          <View>
            <FlatList
              numColumns={3}
              data={categories}
              renderItem={({ item }) => (
                <View
                  style={{
                    alignItems: "space-between",
                    marginVertical: 10,
                    width: "33%",
                  }}
                >
                  <CategoryscreenCard
                    onPress={() => {
                      navigation.navigate(appStackScreens.ProductScreen.name, {
                        CategoryId: item.CategoryId,
                        CategoryName: item.CategoryName,
                      });
                    }}
                    title={item.CategoryName}
                    numberOfProducts={20}
                    image={item.CategoryImage}
                  />
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}
