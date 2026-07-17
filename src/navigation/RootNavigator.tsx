import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CoinDetailsScreen from "../screens/CoinDetails/CoinDetailsScreen";
import AuthStack from "./AuthStack";
import DrawerNavigator from "./DrawerNavigator";

export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
  CoinDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />

      <Stack.Screen
        name="MainApp"
        component={DrawerNavigator}
      />

      <Stack.Screen
        name="CoinDetails"
        component={CoinDetailsScreen}
      />
    </Stack.Navigator>
  );
}