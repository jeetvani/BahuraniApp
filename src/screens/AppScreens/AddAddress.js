import { View, Text, ScrollView, TextInput, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../Constants/res/COLORS";
import ScreenHeader from "../../Components/ScreenHeader";
import AddAddressInput from "../../Components/Profile/AddAddressInput";
import PrimaryButton from "../../Components/PrimaryButton";
import * as Location from "expo-location";
import { addAddress, editAddress } from "../../API/lib/user";
import { useNavigation } from "@react-navigation/native";
export default function AddAddress({ route }) {
  const edit = route.params.edit;
  if (edit) {
    console.log(route.params.Address);
  }
  const houseNumber = edit
    ? route.params.Address.Address.split(" | ")[1].trim()
    : "";
  const landmark = edit
    ? route.params.Address.Address.split(" | ")[2].trim()
    : "";
  const city = edit ? route.params.Address.Address.split(" | ")[3].trim() : "";
  const state = edit ? route.params.Address.Address.split(" | ")[4].trim() : "";
  const area = edit ? route.params.Address.Address.split(" | ")[0].trim() : "";
  const navigation = useNavigation();
  const [Name, setName] = useState(edit ? route.params.Address.Name : "");
  const [Phone, setPhone] = useState(
    edit ? route.params.Address.PhoneNumber : ""
  );
  const [City, setCity] = useState(edit ? city : "");
  const [State, setState] = useState(edit ? state : "");
  const [Street, setStreet] = useState(edit ? area : "");
  const [Pincode, setPincode] = useState(
    edit ? route.params.Address.PinCode : ""
  );
  //state for house number
  const [HouseNumber, setHouseNumber] = useState(edit ? houseNumber : "");
  //state for landmark
  const [Landmark, setLandmark] = useState(edit ? landmark : "");
  const [FetchingLocation, setFetchingLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const param = route.params;

  async function saveAddress() {
    if (
      Name == "" ||
      Phone.length < 10 ||
      City == "" ||
      State == "" ||
      Street == "" ||
      Pincode == ""
    ) {
      alert("Please fill all the fields");
    } else {
      setIsLoading(true);
      addAddress({
        address:
          Street +
          " | " +
          HouseNumber +
          " | " +
          Landmark +
          " | " +
          City +
          " | " +
          State +
          " | ",
        Pincode: Pincode,
        Name: Name,
        PhoneNumber: Phone,
      }).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          ToastAndroid.show("Address added successfully", ToastAndroid.SHORT);
          navigation.goBack();
          setIsLoading(false);
        } else {
          alert("Something went wrong");
          setIsLoading(false);
        }
      });
    }
  }
  async function editAddressForUser() {
    if (
      Name == "" ||
      Phone.length < 10 ||
      City == "" ||
      State == "" ||
      Street == "" ||
      Pincode == ""
    ) {
      alert("Please fill all the fields");
    } else {
      setIsLoading(true);
      editAddress({
        Address_Id: param.Address.Address_Id,
        address:
          Street +
          " | " +
          HouseNumber +
          " | " +
          Landmark +
          " | " +
          City +
          " | " +
          State +
          " | ",
        Pincode: Pincode,
        Name: Name,
        PhoneNumber: Phone,
      }).then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          ToastAndroid.show("Address changed successfully", ToastAndroid.SHORT);
          navigation.goBack();
          setIsLoading(false);
        } else {
          alert("Something went wrong");
          setIsLoading(false);
        }
      });
    }
  }

  async function GetLocation() {
    setFetchingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access location was denied");
      setFetchingLocation(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    let address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    console.log(address);
    setCity(address[0].city);
    setState(address[0].region);
    setPincode(address[0].postalCode);
    setFetchingLocation(false);
    setStreet(address[0].street);
    console.log(location);
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScreenHeader heading={"Add delivery address"} backButton={true} />
      <ScrollView>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <AddAddressInput
            value={Name}
            onChangeText={(text) => {
              setName(text);
            }}
            Placeholder={"Full Name (Required)*"}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <AddAddressInput
            value={Phone}
            onChangeText={(text) => {
              setPhone(text);
            }}
            maxLength={10}
            keyBoardType={"Phone-Pad"}
            Placeholder={"Phone number (Required)*"}
          />
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ flex: 1 }}>
              <AddAddressInput
                value={Pincode}
                onChangeText={(text) => {
                  setPincode(text);
                }}
                maxLength={6}
                keyBoardType={"Phone-Pad"}
                Placeholder={"Pincode (Required)*"}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <PrimaryButton
                icon={"bullseye"}
                loading={FetchingLocation}
                onPress={GetLocation}
                filled
                borderRadius={5}
                content={"Use current location"}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={{ flex: 1 }}>
              <AddAddressInput
                value={State}
                onChangeText={(text) => {
                  setState(text);
                }}
                Placeholder={"State (Required)*"}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                justifyContent: "center",
              }}
            >
              <AddAddressInput
                value={City}
                onChangeText={(text) => {
                  setCity(text);
                }}
                Placeholder={"City (Required)*"}
              />
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <AddAddressInput
            value={HouseNumber}
            onChangeText={(text) => {
              setHouseNumber(text);
            }}
            Placeholder={"House No , Building Name (Required)*"}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <AddAddressInput
            value={Street}
            onChangeText={(text) => {
              setStreet(text);
            }}
            Placeholder={"Road Name , Area , Colony (Required)*"}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <AddAddressInput
            value={Landmark}
            onChangeText={(text) => {
              setLandmark(text);
            }}
            Placeholder={"Nearby Shop / Landmark (Required)*"}
          />
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
        <PrimaryButton
          onPress={edit ? editAddressForUser : saveAddress}
          filled
          isLoading={isLoading}
          borderRadius={5}
          fontSize={15}
          content={"Save Address"}
        />
      </View>
    </View>
  );
}
