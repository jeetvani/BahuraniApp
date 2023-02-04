import React, { useState } from "react";
import { View, ActivityIndicator, Platform, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

function Policies(props) {
  const INJECTEDJAVASCRIPT = ``;
  const ActivityIndicatorLoadingView = () => {
    return <ActivityIndicator size="large" />;
  };
  return (
    <View style={Styles.container}>
      <WebView
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        scrollEnabled
        source={{ uri: "https://bahurani.online/privacy-policy/" }}
      />
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginTop: Platform.OS == "ios" ? 35 : 10,
  },
});
export default Policies;