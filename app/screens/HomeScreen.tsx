// screens/HomeScreen.tsx: Detta är appens startsida där användaren kan välja en nyhetskategori.

import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../types/navigation";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = { 
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const categories = [   // Lista över alla nyhetskategorier med emoji och namn
    { id: 1, name: "Sweden News", icon: "🇸🇪", category: "general" },
    { id: 2, name: "World News", icon: "🌍", category: "general" },
    { id: 3, name: "Business", icon: "💼", category: "business" },
    { id: 4, name: "Technology", icon: "📱", category: "technology" },
    { id: 5, name: "Sports", icon: "⚽", category: "sports" },
    { id: 6, name: "Entertainment", icon: "🎬", category: "entertainment" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NewsHub</Text>
        <Text style={styles.subtitle}>Stay informed with the latest news</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryButton}
              onPress={() =>
                navigation.navigate("News", { category: item.category })
              }
            >
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, backgroundColor: "#1e90ff" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#fff" },
  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold" },
  categoriesContainer: { flexDirection: "row", flexWrap: "wrap" },
  categoryButton: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  categoryIcon: { fontSize: 30 },
  categoryName: { fontSize: 14, fontWeight: "500" },
});

export default HomeScreen;
