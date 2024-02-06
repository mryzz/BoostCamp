import { useState, useEffect } from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { showMessage } from 'react-native-flash-message';
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';

import useDimensions from '../../hooks/useDimensions';
import { HeadingText, SubHeadingText } from '../../components/styled-text';
import { Input, PwdInput } from '../../components/ui/input';
import { PrimaryButton } from '../../components/ui/button';
import { useAuthStore } from '../../store/useAuthStore';
import { validateEmail, validatePassword } from '../../utils/validateInput';

export default function LoginScreen() {
  // State hooks for managing email, password, and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Hooks for navigation and screen dimensions
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { screenWidth, screenHeight } = useDimensions();

  // Zustand store for managing authentication state
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuthStore();

  // API URL for login requests
  const URL = 'http://192.168.1.160:8000/accounts/api-auth/login/';
  interface ApiErrorResponse {
    error: string;
  }

  function resetStack() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'root-home-stack' }], // Name of the route defined in RootStackParamList
      })
    );
  }

  // Effect hook to navigate to a protected route if already logged in
  useEffect(() => {
    // Check the authentication state when the component mounts
    if (isLoggedIn && user.token) {
      resetStack();
    }
  }, [isLoggedIn, user.token, navigation]);

// Function to handle the login process
  async function handleLogin() {
    // Validate email and password before attempting to log in
    if (!validateEmail(email.trim()) || !validatePassword(password)) {
      showMessage({
        message: "Please ensure all fields are correctly filled and valid.",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('loading');
      // Attempt to log in via the API
      const response = await axios.post(URL, {
        email: email.trim(),
        password: password,
      });

      // Successful login response handling
      if (response.data && response.status === 200) {
        const { token, ...userDetails } = response.data;
        setUser({ ...userDetails, token }); // Update user state with details and token
        setIsLoggedIn(true); // Set logged in state to true
        showMessage({
          message: "Successfully logged in!",
          type: "success",
          icon: "success",
        });
        resetStack(); // Navigate to a protected route
      }
    } catch (error) {
      console.log(error)
      handleLoginError(error); // Handle any errors during login
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  // Function to handle login errors and provide user feedback
  function handleLoginError(error: unknown) {
    const err = error as AxiosError;
    let errorMessage = "Failed to log in!";

    // Determine the type of error and set an appropriate message
    if (err.response) {
      const errorData = err.response.data as ApiErrorResponse;
      errorMessage = errorData.error ? errorData.error : errorMessage;
    } else if (err.request) {
      errorMessage = "Network error or server did not respond.";
    }

    // Display the error message to the user
    showMessage({
      message: errorMessage,
      type: "danger",
      icon: "danger",
    });
  }

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        paddingVertical: 32,
      }}
    >
      <View>
        <HeadingText style={{ color: "coral" }}>
          Welcome back to ClassGo
        </HeadingText>
        <SubHeadingText onPress={() => navigation.navigate('Signup')}>
          Don't have an account? create one now
        </SubHeadingText>

        <View style={{ marginTop: 32, gap: 16 }}>
          <Input
            placeholder="email address"
            onChangeText={(e) => setEmail(e)}
            value={email}
          />
          <View style={{ gap: 8 }}>
            <PwdInput
              placeholder="password"
              onChangeText={(e) => setPassword(e)}
              value={password}
            />
            {/* <SubHeadingText onPress={() => navigate("forgot-password")}>
              forgot password? reset it
            </SubHeadingText> */}
          </View>
        </View>
      </View>

      <PrimaryButton
        title={loading ? <ActivityIndicator color={"#fff"} /> : "Login"}
        onPress={handleLogin}
      />
    </View>
  );
}