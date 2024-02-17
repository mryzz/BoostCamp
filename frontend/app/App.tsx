import "react-native-gesture-handler";
import { ActivityIndicator } from 'react-native';
import React from 'react';
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./src/navigation/root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import useCachedResources from './src/hooks/useCachedResources'

export default function App() {
  const { isLoadingComplete, loadingError } = useCachedResources()

  if (!isLoadingComplete) {
    // Render a loading indicator while fonts are loading
    return <ActivityIndicator size="large" />;
  }

  if (loadingError) {
  // Show an error message or alert
  alert(loadingError);
  return; // Optional: You might want to return an error screen here
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <RootNavigation />
      <FlashMessage
        position="top"
        animated
        statusBarHeight={40}
        titleStyle={{ fontFamily: "InterSoftMedium", fontSize: 16 }}
        duration={3000}
      />
    </SafeAreaProvider>
  );
}
