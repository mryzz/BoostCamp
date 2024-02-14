import { useState, useEffect } from 'react';
import useDimensions from '../../hooks/useDimensions';
import { View, Text, ActivityIndicator, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useNavigation, CommonActions, NavigationProp } from '@react-navigation/native';

export default function CoachForm() {
  // And other form field state
  const [loading, setLoading] = useState(false);

  // Hooks for navigation and screen dimensions
  const navigation = useNavigation<NavigationProp<InitialSetupStackParamList>>();
  const { screenWidth, screenHeight } = useDimensions();
  
  function resetStack() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'home-stack' }],
      })
    );
  }

  // Function to handle the form creation
  async function handleForm() { 
    resetStack();
    // TODO: validate user inputs

    // TODO: Post data to backend
    // try {
    //   const formData = new FormData();
    //   formData.append('email', email);
    //   formData.append('password', password);

    //   const response = await axios.post(URL, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (response.status === 200 || response.status === 201) {
    //     showMessage({
    //       message: "Account created successfully!",
    //       type: "success",
    //     });
    //     handleSignUpSuccess();
    //   }
    // } catch (error) {
    //     handleLoginError(error); // Handle any errors during login
    //   }
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
      <Text>Coach Form</Text>
      <Button title="Submit" onPress={() => handleForm() } />
    </ScrollView>
  )
}
