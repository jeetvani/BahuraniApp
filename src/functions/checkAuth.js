import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function checkAuth() {
  const userId = await AsyncStorage.getItem("UserId");
  if (userId) {
    console.log("User logged in");
    return true;
  } else {
    console.log("User not logged in");
    return false;
  }
}
