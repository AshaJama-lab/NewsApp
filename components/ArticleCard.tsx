import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/theme";

export default function ArticleCard({
  article,
  onPress,
}: {
  article: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text style={{ color: Colors.light.muted }}>Ingen bild</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description || "Ingen beskrivning tillgänglig."}
        </Text>
        <Text style={styles.source}>
          {article.source?.name} –{" "}
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString('sv-SE')
            : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  noImage: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  body: {
    padding: 16,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.light.muted,
    marginBottom: 8,
    lineHeight: 20,
  },
  source: {
    fontSize: 12,
    color: Colors.light.muted,
  },
});