import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../styles/colors";

type CoinCardProps = {
  name: string;
  symbol: string;
  price: string;
  change: number;
  image: string;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
};

const CoinCard = ({
  name,
  symbol,
  price,
  change,
  image,
  isFavorite,
  onPress,
  onFavoritePress,
}: CoinCardProps) => {
  const isPositive = change >= 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        <View style={styles.coinInformation}>
          <Image
            source={{ uri: image }}
            style={styles.coinImage}
          />

          <View>
            <Text style={styles.name}>{name}</Text>

            <Text style={styles.symbol}>
              {symbol.toUpperCase()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={
              isFavorite
                ? colors.danger
                : colors.subText
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>

        <Text
          style={[
            styles.change,
            {
              color: isPositive
                ? colors.success
                : colors.danger,
            },
          ]}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
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

  coinInformation: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  coinImage: {
    width: 42,
    height: 42,
    marginRight: 12,
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

  favoriteButton: {
    padding: 8,
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