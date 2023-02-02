import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import { fakeCategoryData } from "../../Constants/fakeData";
import ProductScreenCard from "../../Components/Product/ProductScreenCard";

export default function AllProducts() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader searchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ marginHorizontal: 20, alignItems: "center", marginTop: 20 }}
        >
          <FlatList
            data={fakeCategoryData}
            numColumns={2}
            renderItem={({ item }) => (
              <View>
                <ProductScreenCard
                  image={item.image}
                  price={item.ourPrice}
                  name={item.name}
                  mrp={item.mrp}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}
