import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import useDimensions from '../../hooks/useDimensions';
import { HeadingText, SubHeadingText, BoldText } from '../../components/styled-text';
import { Input, PwdInput } from '../../components/ui/input';
import { PrimaryButton } from '../../components/ui/button';
import { validateEmail, validateMatchPassword, validatePassword } from '../../utils/validateInput';
import { useAuthStore } from '../../store/useAuthStore';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>('');

  const { screenWidth, screenHeight } = useDimensions();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { setHasJustSignedUp, setIsLoggedIn } = useAuthStore();

  // API URL for login requests
  const URL = 'http://192.168.1.160:8000/accounts/signup/';
  interface ApiErrorResponse {
    error: string;
  }

  interface SignupSuccessResponse {
    token: any;
    message: string; // Adjust based on your API's response structure
  }

  function resetStack() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'auth-stack' }], // Name of the route defined in RootStackParamList
      })
    );
  }

  const handleSignUpSuccess = () => {
    setHasJustSignedUp(true);
    resetStack(); 
  };

  async function selectImageFromGallery() {
    // Image selection logic remains the same
  }

async function handleSignup() {
  if (!validateEmail(email) || !validatePassword(password) || !validateMatchPassword(password, confirmPassword)) {
    showMessage({
      message: "Please ensure all fields are correctly filled and valid.",
      type: "danger",
    });
    return;
  }

  setLoading(true);

  // Create a promise that rejects after 7 seconds
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), 7000);
  });

  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    console.log(formData);
    // Race the axios request against the timeout
    const result = await Promise.race([
      axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      timeoutPromise
    ]);

    // Explicitly assert the type of the response after the race
    // Note: This assumes the result is of SignupSuccessResponse and not the error from timeout
    const response = result as AxiosResponse<SignupSuccessResponse>;

    if (response.status === 200 || response.status === 201) {
      showMessage({
        message: "Account created successfully!",
        type: "success",
      });

      handleSignUpSuccess();
    }
  } catch (error) {
    setLoading(false); // Ensure loading state is reset

    // Asserting error type as AxiosError
    if (axios.isAxiosError(error)) {
      let errorMessage = "Failed to sign up!";
      if (error.response) {
        const errorData = error.response.data as ApiErrorResponse;
        errorMessage = errorData.error ? errorData.error : errorMessage;
      } else if (error.request) {
        errorMessage = "Network error or server did not respond.";
      }
      showMessage({
        message: errorMessage,
        type: "danger",
        icon: "danger",
      });
    } else if (error instanceof Error && error.message === 'Request timed out') {
      // Handle timeout specific error
      showMessage({
        message: "Signup request timed out, please try again.",
        type: "danger",
      });
    } else {
      // Handle other errors that might not be Axios errors
      showMessage({
        message: "An unexpected error occurred.",
        type: "danger",
      });
    }
  }
}

  return (
    <ScrollView
      style={{
        width: screenWidth,
        height: screenHeight,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 32,
      }}
      contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
    >
      <View>
        <HeadingText style={{ color: "coral" }}>
          Hey there, welcome to ClassGo
        </HeadingText>
        <SubHeadingText onPress={() => navigation.navigate("Login")}>
          already have an account? login
        </SubHeadingText>

        <View style={{ marginTop: 32, gap: 16 }}>
          <Input
            placeholder="email address"
            onChangeText={(e) => setEmail(e)}
            value={email}
          />
          <PwdInput
            placeholder="password"
            onChangeText={(e) => setPassword(e)}
            value={password}
          />
          <PwdInput
            placeholder="confirm password"
            onChangeText={(e) => setConfirmPassword(e)}
            value={confirmPassword}
          />
          <View
            style={{
              gap: 16,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TouchableOpacity
              onPress={selectImageFromGallery}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: "#d3d3d3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person-outline" size={20} color={"#000"} />
              )} */}
            </TouchableOpacity>
            {/* {image ? (
              <BoldText>upload a new avatar</BoldText>
            ) : (
              <BoldText>upload an avatar</BoldText>
            )} */}
          </View>
        </View>
      </View>

      <PrimaryButton
        title={loading ? <ActivityIndicator color={"#fff"} /> : "sign up"}
        onPress={handleSignup}
      />
    </ScrollView>
  );
}