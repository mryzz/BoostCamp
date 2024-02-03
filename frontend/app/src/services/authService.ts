import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook if you're using React Navigation
import { useAuthStore } from '../store/useAuthStore'; // Adjust path as necessary

const checkAndMakeAuthenticatedRequest = async (url: any, method: any, data: any) => {
  const { token } = useAuthStore.getState().user;
  const navigation = useNavigation(); // Use this hook inside a React component

  if (!token) {
    // If there's no token, redirect to the login screen
    navigation.navigate('Login');
    return;
  }

  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if error is due to unauthorized access
      if (error.response && error.response.status === 401) {
        // Handle wrong token (e.g., token expired)
        // Optionally, clear the token and user info from Zustand store
        useAuthStore.getState().setUser({ uid: "", email: "", username: "", avatar: "", token: "" });
        useAuthStore.getState().setIsLoggedIn(false);

        // Prompt user to log in again
        navigation.navigate('Login');
      } else {
        // Handle other errors
        console.error('Error making authenticated request', error);
      }
    } else {
      // Non-Axios error
      console.error('An unexpected error occurred', error);
    }
  }
};