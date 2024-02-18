import React from 'react';
import { Alert, Button } from 'react-native';
import { useAuthStore } from '../store/useAuthStore'; // Adjust path as necessary
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

export default function LogoutButton() {
  const { setLogout, setIsLoggedIn, setToken} = useAuthStore();
  const navigation = useNavigation();

  function resetStack() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'auth-stack' }], // Name of the route defined in RootStackParamList
      })
    );
  }

  const confirmLogOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Yes", onPress: () => {
              setLogout(); 
              setIsLoggedIn(false); 
              setToken("");
              resetStack();
            }
        }
      ]
    );
  };

  return (
    <Button title="Log Out" onPress={confirmLogOut} />
  );
}