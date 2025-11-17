import { Redirect, SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { storage } from '../utils/utils';

SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await storage.get("access_token");
      console.log("Token on startup:", token);
// storage.delete("access_token")
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      


      SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {isLogin ? <Redirect href="/(main)" /> : <Redirect href="/(auth)" />}
    </>
  );
};

export default RootNavigation;
  