// App.tsx: Här skapar vi huvudnavigeringen för appen med både stack- och tab-navigatorer.

import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedScreen from "./screens/SavedScreen";

// Screens
import ArticleDetailScreen from "./screens/ArticleDetailScreen";
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";

// navigationsparametrar
export type RootStackParamList = {
  Home: undefined;
  News: { category: string };
  ArticleDetail: { article: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Skapa Stack- och Tab-navigator
const Tab = createBottomTabNavigator();

function HomeStack() { //Stack med Home -> News -> ArticleDetail
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Hem" }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ route }) => ({
          title: route.params?.category || "Nyheter",
        })}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{ title: "Artikel" }}
      />
    </Stack.Navigator>
  );
}

export default function App() { //Huvud-App med Tab-navigering
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors.light.primary,
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "Hem") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Sparade") {
              iconName = focused ? "bookmark" : "bookmark-outline";
            } else if (route.name === "Profil") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Hem" component={HomeStack} />
        <Tab.Screen name="Sparade" component={SavedScreen} />
        <Tab.Screen
          name="Profil"
          component={HomeScreen}
          options={{ title: "Profil" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}