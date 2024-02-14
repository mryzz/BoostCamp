import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";


interface UseCachedResourcesResult {
  isLoadingComplete: boolean;
  loadingError: string | null;
}
// TypeScript: Define the return type of the hook
export default function useCachedResources(): UseCachedResourcesResult {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutHandle: ReturnType<typeof setTimeout>;

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        timeoutHandle = setTimeout(() => {
          if (!isLoadingComplete) {
            setLoadingError('Loading timeout: The app took too long to start.');
            SplashScreen.hideAsync();
          }
        }, 8000);

        await Font.loadAsync({
          InterSoftBold: require("../assets/fonts/InterSoft-Bold.otf"),
          InterSoftSemiBold: require("../assets/fonts/InterSoft-Semibold.otf"),
          InterSoftMedium: require("../assets/fonts/InterSoft-Medium.otf"),
          InterSoftRegular: require("../assets/fonts/InterSoft-Regular.otf"),
          ...FontAwesome.font,
        });

        setLoadingComplete(true);
      } catch (e: any) {
        setLoadingError(e.message);
      } finally {
        clearTimeout(timeoutHandle);
        if (!loadingError) {
          SplashScreen.hideAsync();
        }
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // TypeScript: Specify the return type explicitly
  return { isLoadingComplete, loadingError };
}