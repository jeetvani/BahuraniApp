import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ProfileHeader from "../../Components/Profile/ProfileHeader";
import ScreenHeader from "../../Components/ScreenHeader";
import PrimaryButton from "../../Components/PrimaryButton";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  appStackScreens,
  authStackScreens,
  bottomTabScreens,
} from "../../Constants/appScreens";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { getUserProfile } from "../../API/lib/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AccountDetails() {
  // Make a function to log out the user
  async function logOut() {
    // Remove the user token
    await AsyncStorage.removeItem("UserId");
    // Remove the user data

    // Navigate to the login screen
    navigation.navigate(authStackScreens.AuthCheck.name);
  }
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [Loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMakrketingUser, setIsMarketingUser] = useState(false);
  const navigation = useNavigation();

  const [subs, setSubs] = React.useState([]);

  React.useEffect(() => {
    setSubs([
      navigation.addListener("focus", () => {
        setLoading(true);
        getUserProfile()
          .then((res) => {
            console.log(res.data);
            setLoading(false);
            setUserName(res.data.UserProfile[0].Name);
            setProfilePicture(res.data.UserProfile[0].Profile_Picture);
            setIsMarketingUser(res.data.UserProfile[0].isMarketingUser);
            setPhoneNumber(res.data.UserProfile[0].PhoneNumber);
            //  setUserName(res.data.UserProfile[0].Name);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
    ]);

    const unsubscribe = () => {
      navigation.removeAllListeners();
    };
    // Remove all listeners, because there have to be no listeners on unmounted screen
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader />
      <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
        {Loading ? (
          <View style={{ marginBottom: 10 }}>
            <SkeletonPlaceholder>
              <View style={{ marginHorizontal: 5, marginTop: 20 }}>
                <View style={{ width: "100%", height: 80, borderRadius: 5 }} />
              </View>
            </SkeletonPlaceholder>
          </View>
        ) : (
          <ProfileHeader
            userName={userName}
            isMarketingUser={isMakrketingUser}
            phoneNumber={phoneNumber}
            profilePicture={profilePicture}
          />
        )}
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <PrimaryButton
                borderColor={COLORS.black}
                borderWidth={0.4}
                textColor={COLORS.black}
                icon={"box-open"}
                onPress={() => {
                  navigation.navigate(authStackScreens.Orders.name);
                }}
                fontSize={14}
                content={" Your Orders"}
                borderRadius={4}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <PrimaryButton
                borderColor={COLORS.black}
                borderWidth={0.4}
                textColor={COLORS.black}
                fontSize={14}
                onPress={() => {
                  navigation.navigate(bottomTabScreens.Wishlist.name);
                }}
                icon={"heart"}
                content={"Wishlist"}
                borderRadius={4}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <PrimaryButton
                onPress={() => {
                  navigation.navigate(appStackScreens.AdminUserChat.name);
                }}
                borderColor={COLORS.black}
                borderWidth={0.4}
                textColor={COLORS.black}
                fontSize={14}
                icon={"headphones"}
                content={"Help & Queries"}
                borderRadius={4}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              <PrimaryButton
                borderColor={COLORS.black}
                borderWidth={0.4}
                textColor={COLORS.black}
                fontSize={14}
                onPress={() => {
                  navigation.navigate(authStackScreens.Coupons.name);
                }}
                icon={"money-bill"}
                content={"Coupons"}
                borderRadius={4}
              />
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <PrimaryButton
                borderColor={COLORS.black}
                textColor={COLORS.black}
                textAlign={"left"}
                content={"Edit Profile"}
                icon={"user-edit"}
                fontSize={14}
                onPress={() => {
                  navigation.navigate(authStackScreens.EditProfile.name, {
                    phoneNumber: phoneNumber,
                    profilePicture: profilePicture,
                    userName: userName,
                  });
                }}
                borderRadius={4}
                buttonHeight={50}
                borderWidth={0.4}
              />
            </View>

            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <PrimaryButton
                borderColor={COLORS.black}
                textColor={COLORS.black}
                onPress={() =>
                  navigation.navigate(authStackScreens.Addresses.name)
                }
                textAlign={"left"}
                content={"Saved Addresses"}
                icon={"map-marker-alt"}
                fontSize={14}
                borderRadius={4}
                buttonHeight={50}
                borderWidth={0.4}
              />
            </View>
            {isMakrketingUser ? (
              <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <PrimaryButton
                  borderColor={COLORS.black}
                  textColor={COLORS.black}
                  textAlign={"left"}
                  onPress={() => {
                    navigation.navigate(authStackScreens.Referrals.name);
                  }}
                  content={"Your Referrals & Rewards"}
                  icon={"award"}
                  fontSize={14}
                  borderRadius={4}
                  buttonHeight={50}
                  borderWidth={0.4}
                />
              </View>
            ) : null}

            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <PrimaryButton
                onPress={logOut}
                borderColor={COLORS.black}
                textColor={COLORS.black}
                textAlign={"left"}
                content={"Log-Out"}
                icon={"sign-out-alt"}
                fontSize={14}
                borderRadius={4}
                buttonHeight={50}
                borderWidth={0.4}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
