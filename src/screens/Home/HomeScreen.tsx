import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text
} from "react-native";

import CoinCard from "../../components/CoinCard";
import SearchBar from "../../components/SearchBar";
import colors from "../../styles/colors";

const HomeScreen = () => {
  const [coins] = useState([
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
      price: "$118,340",
      change: 2.15,
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,845",
      change: -0.73,
    },
    {
      id: "3",
      name: "Solana",
      symbol: "SOL",
      price: "$184",
      change: 4.82,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Sanad Crypto Tracker
      </Text>

      <Text style={styles.subtitle}>
        Track cryptocurrency prices easily.
      </Text>

      <SearchBar />

      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinCard
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
            isFavorite={false}
            onFavoritePress={() => {}}
          />
        )}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
  },

  subtitle: {
    color: colors.subText,
    fontSize: 15,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default HomeScreen;