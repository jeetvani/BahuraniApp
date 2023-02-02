import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import * as Data from "../../Constants/fakeData";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appStackScreens } from "../../Constants/appScreens";
import PrimaryButton from "../../Components/PrimaryButton";
import { deleteAddress, getUserAddress } from "../../API/lib/user";
export default function Addresses() {
  const navigation = useNavigation();
  const [Loading, setLoading] = useState(true);
  const [Addresses, setAddresses] = useState([]);
  async function GetData() {
    getUserAddress().then((res) => {
      console.log("====================================");
      console.log(res.data);
      setAddresses(res.data.Addresses);
      console.log("====================================");
    });
  }
  const unsubscribe = navigation.addListener("focus", () => {
    setLoading(true);
    GetData();
    return unsubscribe;
  });
  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };
  const deleteAddressForUser = (id) => {
    deleteAddress(id)
      .then((res) => {
        console.log(res.data);
        //if status 200 show toast
        if (res.data.status == 200) {
          let arr = Addresses.filter(function (item) {
            return item.Address_Id !== id;
          });
          setAddresses(arr);
          LayoutAnimation.configureNext(layoutAnimConfig);
          ToastAndroid.show("Address deleted successfully", ToastAndroid.SHORT);
        }
        //else show alert
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader backButton heading={"Your Addresses"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}>
          <View style={{ marginTop: 10 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={Addresses}
              renderItem={({ item }) => (
                <View
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
                  <View style={{ flex: 4 }}>
                    <Text
                      style={{
                        fontSize: 18,

                        color: COLORS.black,
                      }}
                    >
                      {item.Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,

                        color: COLORS.black,
                      }}
                    >
                      {item.Address}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                        paddingVertical: 3,
                      }}
                    >
                      +91 {item.PhoneNumber}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}
                    >
                      {item.PinCode}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(appStackScreens.AddAddress.name, {
                            Address: item,
                            edit: true,
                          });
                        }}
                      >
                        <FontAwesome
                          name="edit"
                          size={18}
                          color={COLORS.primary}
                        />
                      </TouchableOpacity>
                      {"  "}
                      {Addresses.length > 1 ? (
                        <TouchableOpacity
                          onPress={() => {
                            deleteAddressForUser(item.Address_Id);
                          }}
                        >
                          <FontAwesome
                            name="trash-o"
                            size={18}
                            color={COLORS.primary}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 30, paddingBottom: 10 }}>
        <PrimaryButton
          onPress={() => {
            navigation.navigate(appStackScreens.AddAddress.name, {
              edit: false,
            });
          }}
          content={"Add New Address"}
          icon={"plus"}
          filled
          borderRadius={5}
        />
      </View>
    </View>
  );
}
