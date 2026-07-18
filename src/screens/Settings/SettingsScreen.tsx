import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { signOut } from "firebase/auth";
import AppHeader from "../../components/AppHeader";

import { auth } from "../../firebase/firebaseConfig";
import colors from "../../styles/colors";

type SettingsScreenProps = {
  navigation: any;
};

export default function SettingsScreen({
  navigation,
}: SettingsScreenProps) {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);

      let rootNavigation = navigation;

      while (rootNavigation.getParent()) {
        rootNavigation = rootNavigation.getParent();
      }

      rootNavigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error: any) {
      console.log(
        "Logout Error:",
        error?.code,
        error?.message
      );

      Alert.alert(
        "Logout Failed",
        "Could not logout. Please try again."
      );
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: handleLogout,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Account</Text>

        <Text style={styles.email}>
          {user?.email || "No Email"}
        </Text>

        <Text style={styles.status}>
          Status: Logged In
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={confirmLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    color: colors.text,
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 35,
  },

  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 30,
  },

  label: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },

  email: {
    color: colors.text,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 12,
  },

  status: {
    color: "#22C55E",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },

  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
  },
});

