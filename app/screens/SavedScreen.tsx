// app/screens/SavedScreen.tsx
import { GlobalStyles } from "@/app/styles/global";
import { Text, View } from "react-native";

export default function SavedScreen() {
  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.heading}>Sparade artiklar</Text>
      <Text style={GlobalStyles.text}>Här visas dina sparade nyheter.</Text>
    </View>
  );
}
