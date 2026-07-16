import { StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Market</Text>
      <Text style={styles.description}>The real cryptocurrency prices will be displayed here.</Text>
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
