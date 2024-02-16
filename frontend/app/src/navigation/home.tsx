import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import HomeScreen from "../screens/home/index";
import ProfileScreen from "../screens/home/profile";
import NotificationScreen from "../screens/home/notification";
// import AddEventScreen from "../screens/home/add-event";
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import type { ReactNode } from 'react';

const HomeRoute = () => <HomeScreen />;
const NotificationRoute = () => <NotificationScreen />;
const ProfileRoute = () => <ProfileScreen />;

type RenderIconProps = {
  route: {
    key: string;
  };
  focused: boolean;
  color: string;
};

const HomeNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home-outline' },
    { key: 'notification', title: 'notification', icon: 'file-tray-outline' },
    { key: 'profile', title: 'Profile', icon: 'person-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    notification: NotificationRoute,
    profile: ProfileRoute,
  });

  const renderIcon = ({ route, focused, color }: RenderIconProps): ReactNode => {
    let iconName: keyof typeof Ionicons.glyphMap;
    switch (route.key) {
      case 'home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'notification':
        iconName = focused ? 'notifications' : 'notifications-outline'; // Adjust based on actual icon names
        break;
      case 'profile':
        iconName = focused ? 'person' : 'person-outline';
        break;
      default:
        iconName = 'alert-circle-outline'; // A valid fallback icon
    }

    // Ensure Ionicons has a matching glyphMap for the iconName
    return <Ionicons name={iconName} size={24} color={color} />;
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      labeled={false}

    />
  );
};

export default HomeNavigation;

// const HomeNavigation = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: true,
//         headerLeft: () => null,
//         headerStyle: {
//           borderBottomColor: "#eee",
//           borderBottomWidth: 1,
//         },
//         headerTitleStyle: {
//           fontFamily: "InterSoftBold",
//           fontSize: 24,
//           color: "#000",
//         },
//         ...TransitionPresets.SlideFromRightIOS,
//         animationEnabled: true,
//         gestureEnabled: true,
//         gestureDirection: "horizontal",
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//       />
      {/* <Stack.Screen
        name="add-event"
        component={AddEventScreen}
        options={({ navigation, route }) => ({
          title: "add event",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={goBack}
            >
              <Ionicons name="ios-arrow-down" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
          ...TransitionPresets.ModalPresentationIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "vertical",
        })}
      />
      <Stack.Screen
        name="unsplash"
        component={AddUnsplashImage}
        options={({ navigation, route }) => ({
          title: "search unsplash",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={goBack}
            >
              <Ionicons name="ios-arrow-down" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 16,
                borderRadius: 8,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <BoldText style={{ color: "coral", fontSize: 16 }}>
                create
              </BoldText>
            </TouchableOpacity>
          ),
          ...TransitionPresets.ModalPresentationIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "vertical",
        })}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={({ navigation, route }) => ({
          title: "settings",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={goBack}
            >
              <Ionicons name="ios-arrow-back" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
        })}
      /> */}
//     </Stack.Navigator>
//   );
// };

// export default HomeNavigation;