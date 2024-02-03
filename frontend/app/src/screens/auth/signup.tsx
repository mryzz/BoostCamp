import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios, { AxiosError } from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import useDimensions from '../../hooks/useDimensions';
import { HeadingText, SubHeadingText, BoldText } from '../../components/styled-text';
import { Input, PwdInput } from '../../components/ui/input';
import { PrimaryButton } from '../../components/ui/button';
import { validateEmail, validateMatchPassword, validatePassword } from '../../utils/validateInput';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>('');

  const { screenWidth, screenHeight } = useDimensions();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  // API URL for login requests
  const URL = 'http://127.0.0.1:8000/accounts/api-auth/signup/';
  interface ApiErrorResponse {
    error: string;
  }

  async function selectImageFromGallery() {
    // Image selection logic remains the same
  }

  async function handleSignup() {
    if (!validateEmail(email) || !validatePassword(password) || !validateMatchPassword(password, confirmPassword) || username === "") {
      showMessage({
        message: "Please ensure all fields are correctly filled and valid.",
        type: "danger",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      // If you're handling image uploads, adjust accordingly
      // For example, if `image` is a local file URI:
      // if (image) {
      //   // You'll need to adjust how you handle images based on your backend requirements
      //   formData.append('avatar', { uri: image, type: 'image/jpeg', name: 'avatar.jpg' });
      // }

      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        showMessage({
          message: "Account created successfully!",
          type: "success",
        });
        navigation.navigate('Login');
      }
    } catch (error) {
        handleLoginError(error); // Handle any errors during login
      }
  }

    function handleLoginError(error: unknown) {
    const err = error as AxiosError;
    let errorMessage = "Failed to sign up!";

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
          hey there, welcome to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigation.navigate("Login")}>
          already have an account? login
        </SubHeadingText>

        <View style={{ marginTop: 32, gap: 16 }}>
          <Input
            placeholder="create a unique username"
            onChangeText={(e) => setUsername(e)}
            value={username}
          />
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
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person-outline" size={20} color={"#000"} />
              )}
            </TouchableOpacity>
            {image ? (
              <BoldText>upload a new avatar</BoldText>
            ) : (
              <BoldText>upload an avatar</BoldText>
            )}
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