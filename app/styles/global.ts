import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* ── NEW STYLES FOR GRID + RIPPLE + CARD IMAGE ── */
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    alignSelf: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  gridIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  headline: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: Colors.light.text,
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 12,
  },
});
