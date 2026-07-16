import { StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.description}>Sign in to continue to Sanad Crypto Tracker.</Text>
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
