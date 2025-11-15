//NewsScreen.tsx: // Den här sidan hämtar och visar nyheter från NewsAPI. 
// Vi gjorde Eknomi, Teknik vissar automatisk laddar och de andra (Svenska nyheter, Världsnyheter) använder sökfältet för att hämta nyheter.
import { GlobalStyles } from "@/app/styles/global";
import ArticleCard from "@/components/ArticleCard";
import { NEWS_API_KEY } from "@/constants/config";
import { Colors } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PAGE_SIZE = 20;

// Titlar som visas beroende på kategori
type Category = "sweden" | "world" | "business" | "technology" | "general";

const categoryTitles: Record<Category, string> = {
  sweden: "Svenska Nyheter",
  world: "Världsnyheter",
  business: "Ekonominyheter",
  technology: "Tekniknyheter",
  general: "Senaste Nyheterna",
};

export default function NewsScreen() {
  const params = useLocalSearchParams();
  const category = (params.category as Category) || "general";

  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {   //Hämtar nyheter automatiskt vid kategoriändring
    fetchNews();
  }, [category]);

  const fetchNews = async (searchQuery?: string) => {   // Hämtar nyheter från API:t beroende på sökning eller kategori
    setLoading(true);
    try {
      let url = "";

      if (searchQuery) {         // Sök efter nyheter via sökfält
        // 🔍 Search News
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchQuery
        )}&pageSize=${PAGE_SIZE}&language=sv&apiKey=${NEWS_API_KEY}`;
      } else if (category === "sweden") {
        // 🇸🇪 Swedish headlines
        url = `https://newsapi.org/v2/top-headlines?country=se&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;
      } else {
        // 📂 Top headlines by category
        url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.status !== "ok") throw new Error(json.message || "API error");

      setArticles(json.articles || []);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = () => fetchNews(query || undefined);   // Sökknappshantering

  const onRefresh = useCallback(() => {   //Uppdatering genom "dra för att ladda om"
    setRefreshing(true);
    fetchNews(query || undefined);
  }, [query, category]);

  const openArticle = async (url: string) => {   //Öppna artikellänk i webbläsare
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Cannot open URL", url);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.heading}>
        {categoryTitles[category] || categoryTitles.general}
      </Text>

      {/* 🔍 Search bar */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Sök nyheter..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <MaterialIcons name="search" size={26} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>

      {/* 🔄 Loading */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
          <Text style={{ marginTop: 10 }}>Laddar nyheter...</Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => item.url || idx.toString()}
          renderItem={({ item }) => (
            <ArticleCard article={item} onPress={() => openArticle(item.url)} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>Inga nyheter hittades.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
