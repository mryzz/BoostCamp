import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./auth";
import HomeNavigation from "./home";
import { useAuthStore } from "../store/useAuthStore";
import InitialSetupNavigation from "./initialSetup"

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const { isLoggedIn, hasJustSignedUp, isInitialSetupComplete } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    hasJustSignedUp: state.hasJustSignedUp,
    isInitialSetupComplete: state.isInitialSetupComplete,
  }));

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen name="auth-stack" component={AuthNavigation} />
        ) : hasJustSignedUp && !isInitialSetupComplete ? (
          <Stack.Screen name="initial-setup-stack" component={InitialSetupNavigation} />
        ) : (
          <Stack.Screen name="home-stack" component={HomeNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 
export default RootNavigation;