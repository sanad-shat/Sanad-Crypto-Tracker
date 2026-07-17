import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import colors from "../../styles/colors";

type RegisterScreenProps = {
  navigation: any;
};

export default function RegisterScreen({
  navigation,
}: RegisterScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (
      cleanName === "" ||
      cleanEmail === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields."
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

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Error",
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

      await updateProfile(userCredential.user, {
        displayName: cleanName,
      });

      Alert.alert(
        "Account Created",
        "Your account was created successfully.",
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.replace("MainApp"),
          },
        ]
      );
    } catch (error: any) {
      console.log("FULL FIREBASE ERROR:", error);
      console.log("ERROR CODE:", error?.code);
      console.log("ERROR MESSAGE:", error?.message);
      console.log("ERROR NAME:", error?.name);

      const errorCode =
        error?.code ||
        error?.name ||
        "Unknown";

      const errorMessage =
        error?.message ||
        String(error) ||
        "Something went wrong. Please try again.";

      Alert.alert(
        "Registration Failed",
        `${errorMessage}\n\nCode: ${errorCode}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Image
          source={require(
            "../../../assets/sanad-logo.png"
          )}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Sign up to start tracking cryptocurrency prices
        </Text>

        <Text style={styles.label}>Full Name</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={21}
            color={colors.subText}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={colors.subText}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>

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
            returnKeyType="next"
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
            returnKeyType="next"
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

        <Text style={styles.label}>
          Confirm Password
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={21}
            color={colors.subText}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor={colors.subText}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          <TouchableOpacity
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            <Ionicons
              name={
                showConfirmPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={21}
              color={colors.subText}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.registerButton,
            loading && styles.disabledButton,
          ]}
          onPress={handleRegister}
          activeOpacity={0.8}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </Text>

          {!loading && (
            <Ionicons
              name="person-add-outline"
              size={20}
              color="#FFFFFF"
            />
          )}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Login")
            }
            disabled={loading}
          >
            <Text style={styles.loginLink}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 50,
  },

  logo: {
    width: 135,
    height: 135,
    alignSelf: "center",
    marginBottom: 5,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: colors.subText,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 28,
  },

  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
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
    paddingHorizontal: 10,
    paddingVertical: 15,
  },

  registerButton: {
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

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  loginText: {
    color: colors.subText,
    fontSize: 14,
  },

  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
});