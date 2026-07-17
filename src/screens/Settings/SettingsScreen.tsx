import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import colors from "../../styles/colors";

type Props = {
  navigation: any;
};

export default function SettingsScreen({
  navigation,
}: Props) {
  const user = auth.currentUser;

  const handleLogout = () => {
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
        onPress: async () => {
          try {
            await signOut(auth);

            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: "Auth" }],
            });
          } catch (error) {
            Alert.alert(
              "Error",
              "Failed to logout."
            );
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
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
        onPress={handleLogout}
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
    fontSize: 30,
    fontWeight: "bold",
    color: colors.text,
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
    fontSize: 15,
    color: colors.subText,
    marginBottom: 10,
  },

  email: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },

  status: {
    fontSize: 15,
    color: "#22C55E",
    fontWeight: "600",
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
    fontWeight: "bold",
  },
});