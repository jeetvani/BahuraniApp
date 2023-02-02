import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import * as Data from "../../Constants/fakeData";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens, authStackScreens } from "../../Constants/appScreens";
import PrimaryButton from "../../Components/PrimaryButton";
import Image from "react-native-scalable-image";
import { AirbnbRating } from "react-native-ratings";
export default function Referrals() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader backButton heading={"Your Refer Users"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View style={{ marginTop: 10 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Data.fakeReferralData}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={()=>navigation.navigate(authStackScreens.Orders.name,{
                  Name : item.UsedBy,
                })}
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    paddingHorizontal: 15,
                    backgroundColor: COLORS.white,
                    borderRadius: 5,
                    borderColor: COLORS.primary,
                    paddingVertical: 20,
                    elevation: 10,
                    shadowColor: COLORS.black,
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Text
                      style={{
                        fontSize: 18,

                        color: COLORS.black,
                      }}
                    >
                      {item.UsedBy} Used Your Referral Code on
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        paddingVertical: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {item.Date}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,

                        color: COLORS.black,
                      }}
                    >
                     User Id :  {item.User_Id}
                    </Text>
                    
                    </View>
                <View style={{flex:1}}>
                <Image source={{ uri: 'https://support.hubstaff.com/wp-content/uploads/2019/08/good-pic-300x286.png' }} width={100} />
                 
                </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
