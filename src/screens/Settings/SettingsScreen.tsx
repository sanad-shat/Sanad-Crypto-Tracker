import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import { auth } from "../../firebase/firebaseConfig";
import colors from "../../styles/colors";

export default function SettingsScreen() {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>
            Account
          </Text>

          <Text style={styles.email}>
            {user?.email || "No Email"}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Account Status
          </Text>

          <Text style={styles.status}>
            Logged In
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Application Version
          </Text>

          <Text style={styles.value}>
            Version 1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 35,
  },

  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },

  label: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: 7,
  },

  email: {
    color: colors.text,
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
  },

  status: {
    color: "#22C55E",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  value: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 18,
  },
});