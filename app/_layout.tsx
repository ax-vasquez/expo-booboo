import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useGlobalSearchParams, usePathname } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';
import { DrawerHeaderProvider } from '@/providers/DrawerHeaderProvider';
import { migrateDbIfNeeded } from '@/data/utility';
import { DARK_THEME, LayoutStyles, LIGHT_THEME, BRAND_COLOR_PRIMARY, BRAND_COLOR_SECONDARY } from '@/styles/root';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const db = openDatabaseSync("expo-booboo.db")
  const [pageTitle, setPageTitle] = useState('')
  useDrizzleStudio(db)
  const pathName = usePathname()
  const params = useGlobalSearchParams<{ name: string, id: string }>();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const isRootPage = (): boolean => {
    return pathName === "/" || pathName === "/plantRoster"
  }

  useEffect(() => {
    /**
     * Helper to pick the correct drawer title based on the current URL and/or its parameters.
     */
    const pickPageTitle = async () => {
      let title = ''
      if (isRootPage()) {
        switch (pathName) {
          case '/': {
            title = "Home"
            break;
          }
          default: {
            title = 'NOT SET'
            break;
          }
        }
      } else {
        if (params.name) {
          title = params.name
        }
        if (params.id) {
          if (pathName.includes('plants')) {
            // QUERY FOR PLANT BY ID
            const data = await db.getFirstAsync<{ nick_name: string }>("SELECT nick_name FROM plants WHERE id = ?", params.id)
            if (data) {
              title = data.nick_name
            }
          }
        }
      }
      setPageTitle(title)
    }
    pickPageTitle()
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const rootPages = [
    {
      name: 'index',
      label: 'Home',
    },
  ] as {
    name: string
    label: string
  }[]

  return (
    <ThemeProvider value={colorScheme === 'light' ? LIGHT_THEME : DARK_THEME}>
      <SQLiteProvider
        databaseName='app.db'
        onInit={migrateDbIfNeeded}
      >
        <DrawerHeaderProvider>
          <GestureHandlerRootView style={LayoutStyles.gestureHandlerContainer}>
            <Drawer 
              screenOptions={{
                headerTintColor: BRAND_COLOR_SECONDARY,
                headerStyle: {
                  backgroundColor: BRAND_COLOR_PRIMARY,
                },
                
                drawerActiveTintColor: BRAND_COLOR_SECONDARY,
                drawerInactiveTintColor: BRAND_COLOR_SECONDARY,
                drawerStyle: {
                  backgroundColor: BRAND_COLOR_PRIMARY
                },
                header: () => <CustomHeader title={pageTitle} isRootPage={isRootPage()} />
              }}
              backBehavior='history'
            >
              {rootPages.map(({ name, label }, idx) => {
                return (
                  <Drawer.Screen
                    name={name} // This is the name of the page and must match the url from root
                    options={{
                      drawerLabel: label,
                      title: label,
                      drawerItemStyle: {
                        display: (name.includes("supplies") || name.includes('plants')) ? "none" : "flex"
                      },
                    }}
                    key={idx}
                    
                  />
                )
              })}
            </Drawer>
          </GestureHandlerRootView>
        </DrawerHeaderProvider>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
