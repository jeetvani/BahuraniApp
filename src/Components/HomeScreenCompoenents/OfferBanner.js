import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useState } from "react";
import Image from "react-native-scalable-image";

import Carousel from "react-native-snap-carousel";

export default function OfferBanner() {
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {},
  []);
  const [activeItem, setactiveItem] = useState([{ key: 1 }]);
  const fakeData = [
    {
      id: 1,
      img: "https://i.ibb.co/z44R7DS/1.jpg",
    },
    {
      id: 2,
      img: "https://i.ibb.co/WHrBBbK/2.jpg",
    },
    {
      id: 3,
      img: "https://i.ibb.co/8K61ymL/3.jpg",
    },
  ];
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableWithoutFeedback 
          
        >
          <Image
          borderRadius={8}
            width={Dimensions.get("screen").width * 0.8}
            source={{ uri: item.img }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  return (
    <View style={{marginTop:10}}>
      {/* <ImageSlider
        
        autoPlay={true}
        caroselImageStyle={{ width:Dimensions.get('screen').width*0.9,marginHorizontal:10 }}
            activeIndicatorStyle={{ backgroundColor: COLORS.black }}
        indicatorContainerStyle={{ bottom: -10 }}
      /> */}
       <Carousel
        loop
        autoplay
        layout="default"
        data={[
          {
            img: "https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/1.jpg?alt=media&token=aa5f5ae1-0d05-4cd3-9912-dbe4394e5fa0",
          },
          {
            img: "https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/2.jpg?alt=media&token=f6544bfa-b2ad-40e3-ae8a-8626085ea775",
          },
          {
            img: "https://firebasestorage.googleapis.com/v0/b/androidheythere.appspot.com/o/3.jpg?alt=media&token=0f44647a-025c-4b6c-a0f2-6a7c85ee7664",
          },
        ]}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("screen").width}
        itemWidth={Dimensions.get("screen").width * 0.8}
      />
      {/* <FlatList
        pagingEnabled
        horizontal
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        showsHorizontalScrollIndicator={false}
        data={fakeData}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: 30,
              width: Dimensions.get("screen").width,
            }}
          >
            <Image
              width={Dimensions.get("screen").width * 0.7}
              source={item.img}
            />
          </View>
        )}
      /> */}
    </View>
  );
}
