import { View, Text } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import "react-native-gesture-handler";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { appStackScreens, authStackScreens } from "../Constants/appScreens";
import BannerZoom from "../screens/AppScreens/BannerZoom";
import OTPInput from "../screens/Profile/OTPInput";
import * as Firebase from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
export default function RootNavigation() {
  React.useEffect(async () => {
    const permission = await Firebase.firebase.messaging().hasPermission();
console.log(permission);
    if (!permission) {
      await Firebase.firebase.messaging().requestPermission();
    }
    if (permission) {
      Firebase.firebase.messaging().onMessage(async (remoteMessage) => {
        const msg = await remoteMessage;
        console.log(" notification message", msg);

        await PushNotification.createChannel({
          channelId: remoteMessage.messageId,
          channelName: "default",
        });
        PushNotification.localNotification({
          channelId: remoteMessage.messageId,
          bigText: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          largeIconUrl: remoteMessage.notification.android.imageUrl,
          priority: "max",
          sound: "default",
          ignoreInForeground: true,
        });
      });

      Firebase.firebase
        .messaging()
        .setBackgroundMessageHandler(async (remoteMessage) => {
          const msg = await remoteMessage;
          console.log("====================================");
          console.log(" notification message", msg);
          console.log("====================================");

          await PushNotification.createChannel({
            channelId: remoteMessage.messageId,
            channelName: "default",
          });
          PushNotification.localNotification({
            channelId: remoteMessage.messageId,
            bigText: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
            largeIconUrl: remoteMessage.notification.android.imageUrl,
            priority: "max",
            sound: "default",
          });
        });
    }
  });
  const stack = createStackNavigator();
  return (
    <NavigationContainer independent>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <stack.Screen name="Bottomtab" component={BottomTabNavigator} />
        <stack.Screen
          name={appStackScreens.OrderSuccess.name}
          component={appStackScreens.OrderSuccess.screen}
        />

        <stack.Screen
          name={"CartMain"}
          component={appStackScreens.CartScreen.screen}
        />
        <stack.Screen name={"BannerZoom"} component={BannerZoom} />
        <stack.Screen
          name={appStackScreens.NotificationSettings.name}
          component={appStackScreens.NotificationSettings.screen}
        />

        <stack.Screen
          name={appStackScreens.Policies.name}
          component={appStackScreens.Policies.screen}
        />
        <stack.Screen
          name={"PhoneInput1"}
          component={authStackScreens.PhoneInput.screen}
        />
        <stack.Screen
          name={"OTPInput1"}
          component={authStackScreens.OTPInput.screen}
        />

        <stack.Screen
          name={appStackScreens.FinalizeOrder.name}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
          component={appStackScreens.FinalizeOrder.screen}
        />
        <stack.Screen
          name={appStackScreens.AddAddress.name}
          component={appStackScreens.AddAddress.screen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
