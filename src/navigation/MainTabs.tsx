import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";

import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const [favoriteCoins, setFavoriteCoins] = useState<any[]>([]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            favoriteCoins={favoriteCoins}
            setFavoriteCoins={setFavoriteCoins}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="heart-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {(props) => (
          <FavoritesScreen
            {...props}
            favoriteCoins={favoriteCoins}
            setFavoriteCoins={setFavoriteCoins}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}