import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import IntroductionScreen from '../screens/initialSetup/intro';
import CoachForm from '../screens/initialSetup/setupForm';

const Stack = createStackNavigator();


const InitialSetupNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="InitialSetup">
      {/* <Stack.Screen name="Introduction" component={IntroductionScreen} /> */}
      <Stack.Screen name="CoachForm" component={CoachForm} />
    </Stack.Navigator>
  );
};

export default InitialSetupNavigation;