import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import { auth } from "../../firebase/firebaseConfig";
import colors from "../../styles/colors";

export default function ProfileScreen() {
  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.content}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
          }}
          style={styles.avatar}
        />

        <Text style={styles.title}>My Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>

          <Text style={styles.value}>
            {user?.email || "No Email"}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Status</Text>

          <Text style={styles.value}>
            Logged In
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Application</Text>

          <Text style={styles.value}>
            Sanad Crypto Tracker
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },

  avatar: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: 25,
  },

  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },

  label: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: 6,
  },

  value: {
    color: colors.text,
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 18,
  },
});

export default ProfileScreen;