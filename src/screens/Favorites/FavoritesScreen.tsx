import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import CoinCard from "../../components/CoinCard";
import colors from "../../styles/colors";

type FavoritesScreenProps = {
  navigation: any;
  favoriteCoins: any[];
  setFavoriteCoins: React.Dispatch<
    React.SetStateAction<any[]>
  >;
};

export default function FavoritesScreen({
  navigation,
  favoriteCoins,
  setFavoriteCoins,
}: FavoritesScreenProps) {
  const removeFavorite = (coinId: string) => {
    const newFavorites = favoriteCoins.filter(
      (coin) => coin.id !== coinId
    );

    setFavoriteCoins(newFavorites);
  };

  const openCoinDetails = (coin: any) => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.navigate("CoinDetails", {
      coin: coin,
    });
  };

  const formatPrice = (price: number) => {
    if (price === null || price === undefined) {
      return "$0.00";
    }

    if (price < 1) {
      return "$" + price.toFixed(6);
    }

    return (
      "$" +
      price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <Text style={styles.title}>Favorites</Text>

      <Text style={styles.description}>
        Your favorite cryptocurrencies.
      </Text>

      {favoriteCoins.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No favorite coins
          </Text>

          <Text style={styles.emptyText}>
            Press the heart icon on any coin to add it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteCoins}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <CoinCard
              name={item.name}
              symbol={item.symbol}
              image={item.image}
              price={formatPrice(item.current_price)}
              change={
                item.price_change_percentage_24h || 0
              }
              isFavorite={true}
              onPress={() => openCoinDetails(item)}
              onFavoritePress={() =>
                removeFavorite(item.id)
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
  },

  description: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginTop: 5,
    marginBottom: 15,
  },

  listContent: {
    paddingBottom: 30,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },

  emptyText: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 8,
  },
});

export default FavoritesScreen;