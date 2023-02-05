import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function checkAuth() {
  const userId = await AsyncStorage.getItem("UserId");
  if (userId) {
    return true;
  } else {
    return false;
  }
}
