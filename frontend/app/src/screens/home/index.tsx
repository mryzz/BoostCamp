import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
// Assuming useDimensions is a custom hook you've create
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import StickyBottomTabs from '../../components/sticky-bottom-tabs';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { setLogout } = useAuthStore();

  const confirmLogOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
            setLogout();  
            navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
          }
        }
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={confirmLogOut} style={{ marginLeft: 15 }}>
          <Ionicons name="log-out-outline" size={26} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        LFGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
      </Text>
      {/* Uncomment below to include StickyBottomTabs in your layout */}
      {/* <StickyBottomTabs /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // If you need specific width and height from useDimensions, you can apply them here.
    // However, for full-screen usage, flex: 1 is typically sufficient.
  },
  headerText: {
    fontSize: 24, // Adjust fontSize to match <h1> styling as needed
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    marginTop: 20, // Add some top margin
  },
});