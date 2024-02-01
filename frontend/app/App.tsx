import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./src/navigation/root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "./src/store/useAuthStore";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const user = useAuthStore((state) => state.user)

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