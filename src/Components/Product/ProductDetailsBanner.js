import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { ImageSlider } from "react-native-image-slider-banner";
import Image from "react-native-scalable-image";
import { COLORS } from "../../Constants/res/COLORS";
import Carousel from "react-native-snap-carousel";
import { FontAwesome } from "@expo/vector-icons";
export default class ProductDetailsBanner extends React.Component {
  constructor(props) {
    const Images = props.Images;
    //structure array of images like fake data

    const arr = [];
    Images.map((item,index) => {
      arr.push({
        id: index+1,
        img: item,
      });
    });

    super(props);
    this.state = {
      activeIndex: 1,
      Images: arr,
    };
  }

  _onViewableItemsChanged = async ({ viewableItems, changed }) => {
    console.log("====================================");
    console.log(viewableItems[0].item.id);
    console.log("====================================");
    const activeIndex = viewableItems[0].item?viewableItems[0].item.id:1;
    this.setState({ activeIndex }, () => {
      // console.log("Banner Active Index", this.state.activeIndex);
      // console.log(this.state.Images);
    });
  };

  render() {
    const renderItem = ({ item, index }) => {
      return (
        <View style={{ alignItems: "center" }}>
          <TouchableWithoutFeedback>
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
      <View style={{ marginTop: 10 }}>
        <Carousel
        viewabilityConfig={{
          itemVisiblePercentThreshold: 60
        }}
          onViewableItemsChanged={this._onViewableItemsChanged}
          loop
          autoplay
          layout="default"
          data={this.state.Images}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width * 0.8}
        />
        <FlatList
          horizontal
          style={{ paddingTop: 10, alignSelf: "center" }}
          data={this.state.Images}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor:
                    this.state.activeIndex === item.id
                      ? COLORS.primary
                      : COLORS.gray,
                  marginHorizontal: 2,
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}
