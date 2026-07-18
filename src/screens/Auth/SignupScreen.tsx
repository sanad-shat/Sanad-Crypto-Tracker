import { StyleSheet, Text, View } from 'react-native';
import colors from '../../styles/colors';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.description}>Create a new account to start tracking cryptocurrencies.</Text>
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
    
    marginBottom: 10,
  },
    description: {
  color: colors.subText,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
