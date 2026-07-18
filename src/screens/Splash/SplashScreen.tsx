import React, { useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import colors from "../../styles/colors";

type SplashScreenProps = {
  navigation: any;
};

export default function SplashScreen({
  navigation,
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/sanad-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sanad Crypto Tracker</Text>

      <Text style={styles.subtitle}>
        Track cryptocurrency prices easily
      </Text>

      <ActivityIndicator
        size="small"
        color={colors.primary}
        style={styles.loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  logo: {
    width: 230,
    height: 230,
  },

  title: {
    color: colors.text,
    fontSize: 26,
    fontFamily: "Poppins_700Bold"
    marginTop: 20,
  },

  subtitle: {
    color: colors.subText,
    fontSize: 15,
    marginTop: 8,
  },

  loading: {
    marginTop: 35,
  },
});