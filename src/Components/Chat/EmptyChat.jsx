import React from "react";
import { Text, View } from "react-native";
import Image from "react-native-scalable-image";
import { appImages } from "../../Constants/appImages";
import PrimaryAuthHeader from "../Auth/PrimaryAuthHeader";
// import { Container } from './styles';

const EmptyChat = ({ Faculty, Name }) => {
  return (
    <View style={{ alignItems: "center" ,marginHorizontal:20}}>
      <Image width={150} height={150} source={appImages.logo} />

      <Text style={{fontSize:16,paddingVertical:10,fontWeight:'bold',textAlign:'center'}}> Welcome to Help Desk , Please write and send us your query </Text>
    </View>
  );
};

export default EmptyChat;
