// screens/ArticleDetailScreen.tsx: Den här sidan visar detaljerad information om en nyhetsartikel.

import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { RootStackParamList } from "../types/navigation";

type ArticleDetailRouteProp = RouteProp<RootStackParamList, "ArticleDetail">;

type Props = { route: ArticleDetailRouteProp };

const ArticleDetailScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;   //  Tar emot artikeldata som skickas från NewsScreen


  const handleShare = async () => {   // Funktion för att dela artikeln via telefonens delningsmeny

    try {
      await Share.share({
        message: `Check out this article: ${article.title}`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {article.image && <Image source={{ uri: article.image }} style={styles.image} />}
      <View style={styles.content}>
        <Text style={styles.category}>{article.category}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.excerpt}>{article.excerpt}</Text>
        <Text style={styles.body}>
          {article.content ??
            "Full article content goes here... (replace with real content)"}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#1e90ff" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={20} color="#1e90ff" />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

//Stil eller css för sidan

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 200 },
  content: { padding: 20 },
  category: { color: "#1e90ff", fontSize: 14 },
  title: { fontSize: 24, fontWeight: "bold" },
  excerpt: { fontSize: 16, color: "#555", marginVertical: 10 },
  body: { fontSize: 16, color: "#333", marginBottom: 20 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: { alignItems: "center" },
  actionText: { marginTop: 5, color: "#1e90ff" },
});

export default ArticleDetailScreen;
