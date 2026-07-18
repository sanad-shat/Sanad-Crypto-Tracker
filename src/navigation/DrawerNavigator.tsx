import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { signOut } from "firebase/auth";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { auth } from "../firebase/firebaseConfig";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import colors from "../styles/colors";
import MainTabs from "./MainTabs";

export type DrawerParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: any) {
  const handleLogout = async () => {
    try {
      await signOut(auth);

      let rootNavigation = props.navigation;

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
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require("../../assets/sanad-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>
          Sanad Crypto Tracker
        </Text>
      </View>

      <View style={styles.divider} />

      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        onPress={confirmLogout}
        labelStyle={styles.logoutLabel}
        icon={({ size }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            color="#EF4444"
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },

        headerTintColor: colors.text,

        headerTitleStyle: {
          fontFamily: "Poppins_600SemiBold",
        },

        drawerStyle: {
          backgroundColor: colors.card,
        },

        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: "#EAFBF2",

        drawerLabelStyle: {
          fontFamily: "Poppins_600SemiBold",
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          title: "Sanad Crypto Tracker",
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          drawerLabel: "Settings",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },

  logo: {
    width: 75,
    height: 75,
    marginBottom: 8,
  },

  appName: {
    color: colors.text,
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
    marginBottom: 8,
  },

  logoutLabel: {
    color: "#EF4444",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});