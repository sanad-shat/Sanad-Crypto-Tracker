import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import CoinCard from "../../components/CoinCard";
import SearchBar from "../../components/SearchBar";
import colors from "../../styles/colors";

type HomeScreenProps = {
  navigation: any;
  favoriteCoins: any[];
  setFavoriteCoins: React.Dispatch<
    React.SetStateAction<any[]>
  >;
};

const HomeScreen = ({
  navigation,
  favoriteCoins,
  setFavoriteCoins,
}: HomeScreenProps) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getCoins = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );

      if (!response.ok) {
        throw new Error("Failed to load coins");
      }

      const data = await response.json();

      setCoins(data);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Could not load cryptocurrency data. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  const refreshCoins = () => {
    setRefreshing(true);
    getCoins();
  };

  const changeFavorite = (coin: any) => {
    const coinExists = favoriteCoins.some(
      (favoriteCoin) => favoriteCoin.id === coin.id
    );

    if (coinExists) {
      const newFavorites = favoriteCoins.filter(
        (favoriteCoin) => favoriteCoin.id !== coin.id
      );

      setFavoriteCoins(newFavorites);
    } else {
      setFavoriteCoins([...favoriteCoins, coin]);
    }
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

  const filteredCoins = coins.filter((coin) => {
    const coinName = coin.name.toLowerCase();
    const coinSymbol = coin.symbol.toLowerCase();
    const search = searchText.trim().toLowerCase();

    return (
      coinName.includes(search) ||
      coinSymbol.includes(search)
    );
  });

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

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />

        <Text style={styles.loadingText}>
          Loading cryptocurrencies...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <FlatList
        data={filteredCoins}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshCoins}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.subtitle}>
              Track the top 100 cryptocurrency prices.
            </Text>

            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Top 100 Coins
              </Text>

              <Text style={styles.coinCount}>
                {filteredCoins.length} Coins
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No coins found
            </Text>

            <Text style={styles.emptyText}>
              Try searching for another coin.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isFavorite = favoriteCoins.some(
            (favoriteCoin) =>
              favoriteCoin.id === item.id
          );

          return (
            <CoinCard
              name={item.name}
              symbol={item.symbol}
              image={item.image}
              price={formatPrice(item.current_price)}
              change={
                item.price_change_percentage_24h || 0
              }
              isFavorite={isFavorite}
              onPress={() => openCoinDetails(item)}
              onFavoritePress={() =>
                changeFavorite(item)
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginTop: 12,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginTop: 10,
  },

  subtitle: {
    color: colors.subText,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginTop: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 12,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },

  coinCount: {
    color: colors.subText,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },

  emptyText: {
    color: colors.subText,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginTop: 8,
  },
});

export default HomeScreen;