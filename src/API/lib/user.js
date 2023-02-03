import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../axiosClient";

export function getProducts() {
  return axiosClient.get("/GetProducts");
}
export function checkPhoneNumber(phoneNumber) {
  return axiosClient.post("/checkPhoneNumber", { phoneNumber: phoneNumber });
}
export function userLogin(phoneNumber) {
  return axiosClient.post("/Login", { phoneNumber: phoneNumber });
}

export async function updateUserName(UserName) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/updateName", {
    UserId: UserId,
    Name: UserName,
  });
}

export async function updateProfilePicture(profilePic) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/updateProfilePic", {
    UserId: UserId,

    Profile_Picture: profilePic,
  });
}

export function userRegister(userObj) {
  return axiosClient.post("/signUp", {
    name: userObj.name,
    phoneNumber: userObj.phoneNumber,
    profilePicture: userObj.profilePicture,
    referCode: userObj.referCode,
    address: userObj.address,
    PinCode: userObj.PinCode,
  });
}

export async function getUserProfile() {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/getUserProfile", {
    UserId: UserId,
  });
}

export async function getUserAddress() {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/getAddress", {
    UserId: UserId,
  });
}

export async function deleteAddress(AddressId) {
  return axiosClient.post("/deleteAddress", {
    Address_Id: AddressId,
  });
}

export async function addAddress(addressObj) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/addAddress", {
    UserId: UserId,
    address: addressObj.address,
    pin: addressObj.Pincode,
    Name: addressObj.Name,
    PhoneNumber: addressObj.PhoneNumber,
  });
}

export async function editAddress(addressObj) {
  return axiosClient.post("/editAddress", {
    Address_Id: addressObj.Address_Id,
    address: addressObj.address,
    pin: addressObj.Pincode,
    Name: addressObj.Name,
    PhoneNumber: addressObj.PhoneNumber,
  });
}

//get cart data
export async function getCartDataAPI() {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/getCartData", {
    UserId: UserId,
  });
}
