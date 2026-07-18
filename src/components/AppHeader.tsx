import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import colors from "../styles/colors";

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/sanad-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Sanad Crypto Tracker
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontFamily: "Poppins_700Bold"
  },
});