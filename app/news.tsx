import { GlobalStyles } from "@/app/styles/global";
import ArticleCard from "@/components/ArticleCard";
import { NEWS_API_KEY } from "@/constants/config";
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
import { Colors } from "../constants/theme";

const PAGE_SIZE = 20;

// 🟢 Typa kategorierna
type CategoryKey = "sweden" | "world" | "business" | "technology" | "general";

const categoryTitles: Record<CategoryKey, string> = {
  sweden: "Svenska Nyheter",
  world: "Världsnyheter",
  business: "Ekonominyheter",
  technology: "Tekniknyheter",
  general: "Senaste Nyheterna",
};

export default function NewsScreen() {
  const params = useLocalSearchParams();
  const category = (params.category as CategoryKey) || "general";

  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = async (searchQuery?: string) => {
    setLoading(true);
    try {
      let url = "";

      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchQuery
        )}&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;
      } else if (category === "sweden") {
        url = `https://newsapi.org/v2/top-headlines?country=se&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${PAGE_SIZE}&apiKey=${NEWS_API_KEY}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.status !== "ok") throw new Error(json.message || "API error");

      setArticles(json.articles || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Okänt fel";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = () => fetchNews(query || undefined);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews(query || undefined);
  }, [query, category]);

  const openArticle = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Kan inte öppna URL", url);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.heading}>{categoryTitles[category]}</Text>

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
