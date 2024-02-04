import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./src/navigation/root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import useCachedResources from './src/hooks/useCachedResources'

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null; // Or some loading indicator
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