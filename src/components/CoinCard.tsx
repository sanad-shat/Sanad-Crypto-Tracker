import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../styles/colors";

type CoinCardProps = {
  name: string;
  symbol: string;
  price: string;
  change: number;
  isFavorite: boolean;
  onFavoritePress: () => void;
};

const CoinCard = ({
  name,
  symbol,
  price,
  change,
  isFavorite,
  onFavoritePress,
}: CoinCardProps) => {
  const isPositive = change >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
        </View>

        <TouchableOpacity onPress={onFavoritePress}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? colors.danger : colors.subText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>

        <Text
          style={[
            styles.change,
            { color: isPositive ? colors.success : colors.danger },
          ]}
        >
          {isPositive ? "+" : ""}
          {change}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
  },

  symbol: {
    color: colors.subText,
    fontSize: 13,
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  price: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },

  change: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default CoinCard;