import { StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';

export default function CoinDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coin Details</Text>
      <Text style={styles.description}>The selected cryptocurrency details will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: colors.secondaryText,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
