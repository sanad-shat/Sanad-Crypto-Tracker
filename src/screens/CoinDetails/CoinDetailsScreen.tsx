import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import colors from "../../styles/colors";

type CoinDetailsScreenProps = {
  route: any;
};

export default function CoinDetailsScreen({
  route,
}: CoinDetailsScreenProps) {
  const coin = route.params?.coin;

  if (!coin) {
    return (
      <SafeAreaView style={styles.container}>
        <AppHeader />

        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Coin not found
          </Text>

          <Text style={styles.errorText}>
            The selected cryptocurrency information is unavailable.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const change = coin.price_change_percentage_24h || 0;
  const isPositive = change >= 0;

  const formatMoney = (value: number) => {
    if (value === null || value === undefined) {
      return "$0.00";
    }

    if (value < 1) {
      return "$" + value.toFixed(6);
    }

    return (
      "$" +
      value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })
    );
  };

  const formatLargeNumber = (value: number) => {
    if (value === null || value === undefined) {
      return "$0";
    }

    return (
      "$" +
      value.toLocaleString("en-US", {
        maximumFractionDigits: 0,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <Image
            source={{ uri: coin.image }}
            style={styles.coinImage}
          />

          <Text style={styles.coinName}>
            {coin.name}
          </Text>

          <Text style={styles.coinSymbol}>
            {coin.symbol.toUpperCase()}
          </Text>

          <Text style={styles.currentPrice}>
            {formatMoney(coin.current_price)}
          </Text>

          <View
            style={[
              styles.changeContainer,
              {
                backgroundColor: isPositive
                  ? "rgba(34, 197, 94, 0.15)"
                  : "rgba(239, 68, 68, 0.15)",
              },
            ]}
          >
            <Ionicons
              name={
                isPositive
                  ? "trending-up"
                  : "trending-down"
              }
              size={20}
              color={
                isPositive
                  ? colors.success
                  : colors.danger
              }
            />

            <Text
              style={[
                styles.changeText,
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
        </View>

        <Text style={styles.sectionTitle}>
          Market Information
        </Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Market Rank
            </Text>

            <Text style={styles.detailValue}>
              #{coin.market_cap_rank || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Market Cap
            </Text>

            <Text style={styles.detailValue}>
              {formatLargeNumber(coin.market_cap)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Trading Volume
            </Text>

            <Text style={styles.detailValue}>
              {formatLargeNumber(coin.total_volume)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              24h High
            </Text>

            <Text style={styles.detailValue}>
              {formatMoney(coin.high_24h)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              24h Low
            </Text>

            <Text style={styles.detailValue}>
              {formatMoney(coin.low_24h)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Price Change
            </Text>

            <Text
              style={[
                styles.detailValue,
                {
                  color: isPositive
                    ? colors.success
                    : colors.danger,
                },
              ]}
            >
              {formatMoney(
                coin.price_change_24h || 0
              )}
            </Text>
          </View>
        </View>

        <Text style={styles.note}>
          Cryptocurrency prices may change frequently depending on market activity.
        </Text>
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
    padding: 20,
    paddingBottom: 40,
  },

  headerCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: "center",
  },

  coinImage: {
    width: 90,
    height: 90,
    marginBottom: 14,
  },

  coinName: {
    color: colors.text,
    fontSize: 27,
    fontFamily: "Poppins_700Bold",
  },

  coinSymbol: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
  },

  currentPrice: {
    color: colors.text,
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    marginTop: 20,
  },

  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },

  changeText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginLeft: 6,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginTop: 26,
    marginBottom: 12,
  },

  detailsCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 17,
  },

  detailLabel: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },

  detailValue: {
    color: colors.text,
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    maxWidth: "55%",
    textAlign: "right",
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
  },

  note: {
    color: colors.subText,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    textAlign: "center",
    marginTop: 20,
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  errorTitle: {
    color: colors.text,
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },

  errorText: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
  },
});