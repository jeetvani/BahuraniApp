import { View, Text, Modal } from "react-native";
import React from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation } from "@react-navigation/native";

export default function BannerZoom({ route }) {
  const imgSrc = route.params.imgSrc;
  const navigation = useNavigation();
  return (
    <Modal
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
      }}
      transparent={true}
    >
      <ImageViewer
        imageUrls={[
          {
            url: imgSrc,
          },
        ]}
      />
    </Modal>
  );
}
