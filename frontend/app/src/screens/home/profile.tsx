import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import LogoutButton from '../../components/logout-button.js';

export default function ProfileScreen() {
  // ProfileScreen's other contents

  return (
    <View style={styles.container}>
      <Text>Hello Profile</Text>
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add more styles as needed
});