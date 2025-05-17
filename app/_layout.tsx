import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import database from '../db/database';
import { DatabaseProvider } from '../db/DatabaseProvider';

async function createMissionWithActions() {
  await database.write(async () => {
    const mission = await database.get('missions').create(m => {
      m.title = 'Write a Book';
      m.description = 'Finish a novel in 3 months';
      m.created_at = Date.now();
    });

    await database.get('actions').create(a => {
      a.mission_id = mission.id;
      a.name = 'Write 500 words';
      a.target_metric = 500;
      a.metric_unit = 'words';
      a.frequency = 'daily';
    });
  });
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <DatabaseProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </DatabaseProvider>
  );
}
