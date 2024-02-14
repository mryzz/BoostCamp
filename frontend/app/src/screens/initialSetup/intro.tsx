// import React from 'react';
// import { View, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useAuthStore } from '../../store/useAuthStore'; // Adjust this path to where your store is defined
// import InitialSetupNavigation from "../../navigation/initialSetup"

// const IntroductionScreen = () => {
//   const navigation = useNavigation();
//   const setProfileType = useAuthStore((state) => state.setProfileType);

//   const handleChooseProfile = (type: "student" | "coach") => {
//     setProfileType(type);
//     navigation.navigate(type === 'student' ? 'StudentForm' : 'CoachForm');
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="I'm a Student" onPress={() => handleChooseProfile('student')} />
//       <Button title="I'm a Coach" onPress={() => handleChooseProfile('coach')} />
//     </View>
//   );
// };

// export default IntroductionScreen;