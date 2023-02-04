import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../Constants/res/COLORS";
import Image from "react-native-scalable-image";
import { ImageSlider } from "react-native-image-slider-banner";
import Carousel from "react-native-snap-carousel";
import ImageModal from "react-native-image-modal";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getBanners } from "../API/lib/banners";
export default class Banner extends React.Component {
  componentDidMount() {
    getBanners().then((response) => {
      const status = response.status;
      if (status === 200) {
        const banners = response;
        console.log("Banners", banners.Banners);

        this.setState({ Banners: banners.Banners }, () => {
          console.log("Banners State Updated");
        });
      }
      if (status === 500) {
        console.log("Server Error Occured");
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 1,
      Banners: [
        {
          BannerId: 1,
          img: "https://miro.medium.com/max/680/1*t8ZaGUP8uXuTTsWuiKNdyA.gif",
        },
      ],
    };
  }
  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    // console.log("====================================");
    // console.log(viewableItems[0]);
    // console.log("====================================");
    const activeIndex = viewableItems[0].item
      ? viewableItems[0].item.BannerId
      : 1;

    this.setState({ activeIndex }, () => {
      //  console.log("Active Index", this.state.activeIndex);
    });
  };

  render() {
    const renderItem = ({ item, index }) => {
      return (
        <View style={{ alignItems: "center" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate("BannerZoom", {
                imgSrc: item.img,
              });
            }}
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
      <View style={{ alignItems: "center" }}>
        <Carousel
          loop
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          autoplay
          layout="default"
          onViewableItemsChanged={this._onViewableItemsChanged}
          data={this.state.Banners}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width * 0.8}
        />

        <FlatList
          horizontal
          style={{ paddingTop: 10 }}
          data={this.state.Banners}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor:
                    this.state.activeIndex === item.BannerId
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
