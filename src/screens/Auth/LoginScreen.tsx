import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import colors from "../../styles/colors";

type LoginScreenProps = {
  navigation: any;
};

export default function LoginScreen({
  navigation,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === "" || password === "") {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    if (!cleanEmail.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      let rootNavigation = navigation;

      while (rootNavigation.getParent()) {
        rootNavigation = rootNavigation.getParent();
      }

      rootNavigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });
    } catch (error: any) {
      let message =
        "Login failed. Please check your information.";

      if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/user-disabled") {
        message = "This account has been disabled.";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        message = "The email or password is incorrect.";
      } else if (
        error.code === "auth/network-request-failed"
      ) {
        message =
          "Please check your internet connection.";
      } else if (
        error.code === "auth/too-many-requests"
      ) {
        message =
          "Too many login attempts. Please try again later.";
      }

      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail === "") {
      Alert.alert(
        "Email Required",
        "Please enter your email address first."
      );
      return;
    }

    if (!cleanEmail.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, cleanEmail);

      Alert.alert(
        "Reset Email Sent",
        "A password reset link has been sent to your email."
      );
    } catch (error: any) {
      let message =
        "Could not send the password reset email.";

      if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (
        error.code === "auth/network-request-failed"
      ) {
        message =
          "Please check your internet connection.";
      }

      Alert.alert("Reset Failed", message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "height" : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require(
            "../../../assets/sanad-logo.png"
          )}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Login to continue tracking the crypto market
        </Text>

        <Text style={styles.label}>Email Address</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={21}
            color={colors.subText}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.subText}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.label}>Password</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={21}
            color={colors.subText}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.subText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={21}
              color={colors.subText}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={handleForgotPassword}
          disabled={loading}
        >
          <Text style={styles.forgotText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.loginButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Logging In..." : "Login"}
          </Text>

          {!loading && (
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          )}
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>
            Don&apos;t have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Register")
            }
            disabled={loading}
          >
            <Text style={styles.registerLink}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 40,
  },

  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 5,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },

  subtitle: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 28,
  },

  label: {
    color: colors.text,
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -4,
    marginBottom: 22,
  },

  forgotText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },

  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 14,
    gap: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "Poppins_700Bold",
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  registerText: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },

  registerLink: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
});