import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../styles/colors";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search cryptocurrency..."
        placeholderTextColor={colors.subText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },

  input: {
    backgroundColor: colors.card,
    color: colors.text,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
});

export default SearchBar;