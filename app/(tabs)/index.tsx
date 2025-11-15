// app/(tabs)/index.tsx
import { GlobalStyles } from "@/app/styles/global";
import { Colors } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

const { width } = Dimensions.get("window");

// 🟢 Definiera typer
type Category = {
  id: string;
  title: string;
  description: string;
  category: string;
};

type Theme = {
  background: string;
  surface: string;
  borderLight: string;
  primary: string;
  primaryDark: string;
  shadow: string;
  text: string;
};

type MenuOption = {
  label: string;
  value: string;
  icon: string;
};

const categories: Category[] = [
  {
    id: "1",
    title: "🇸🇪 Svenska Nyheter",
    description: "Senaste nyheter från Sverige",
    category: "sweden",
  },
  {
    id: "2",
    title: "🌍 Världsnyheter",
    description: "Håll dig uppdaterad om världen",
    category: "world",
  },
  {
    id: "3",
    title: "💼 Ekonomi",
    description: "Ekonomiska nyheter & marknad",
    category: "business",
  },
  {
    id: "4",
    title: "📱 Teknik",
    description: "Nyheter inom tech & innovation",
    category: "technology",
  },
];

const menuOptions: MenuOption[] = [
  { label: "🔧 Inställningar", value: "settings", icon: "settings" },
  { label: "ℹ️ Om appen", value: "about", icon: "information" },
  { label: "📞 Kontakt", value: "contact", icon: "call" },
  { label: "🔔 Notiser", value: "notifications", icon: "notifications" },
  { label: "🌙 Mörkt läge", value: "darkmode", icon: "moon" },
];

export default function HomeScreen() {
  const scheme = useColorScheme();
  const theme: Theme = scheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  // Hover state for web
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Dropdown state
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Optional: global event listener (example: resize)
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handleResize = () => {
      console.log("Screen resized to", window.innerWidth, "x", window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuChange = (value: string) => {
    setSelectedMenu(value);
    setShowDropdown(false);
    
    // Hantera olika menyval
    switch (value) {
      case "settings":
        // Navigera till inställningar eller visa modal
        alert("Inställningar kommer snart!");
        break;
      case "about":
        alert("Nyhetsapp v1.0\nByggd med React Native & Expo");
        break;
      case "contact":
        alert("Kontakta oss: support@nyhetsapp.se");
        break;
      case "notifications":
        alert("Notisinställningar kommer snart!");
        break;
      case "darkmode":
        alert("Mörkt läge växlas automatiskt!");
        break;
      default:
        break;
    }
    
    // Återställ val
    setSelectedMenu("");
  };

  const renderCategory: ListRenderItem<Category> = ({ item }) => {
    const isHovered = hoveredId === item.id;

    // Web hover props
    const hoverProps = Platform.select({
      web: {
        onMouseEnter: () => setHoveredId(item.id),
        onMouseLeave: () => setHoveredId(null),
      },
      default: {},
    });

    return (
      <Link
        href={{ 
          pathname: "/news" as never, 
          params: { category: item.category } 
        }}
        asChild
      >
        <TouchableOpacity
          activeOpacity={0.9}
          {...hoverProps}
          style={{
            flex: 1,
            margin: 8,
            borderRadius: 12,
            padding: 16,
            minHeight: 120,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: theme.borderLight,
            backgroundColor: isHovered ? theme.primaryDark : theme.primary,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 6,
                color: "#fff",
              }}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: "rgba(255,255,255,0.9)" }}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={[GlobalStyles.container, { backgroundColor: theme.background }]}>
      {/* Menu Bar */}
      <View
        style={{
          width: "100%",
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: theme.surface,
          borderBottomWidth: 1,
          borderColor: theme.borderLight,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: theme.text }}>
          📰 Nyhetsappen
        </Text>
        
        {/* Dropdown Menu */}
        <View style={{ width: 150 }}>
          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            style={{
              padding: 8,
              borderRadius: 6,
              backgroundColor: theme.primary,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", textAlign: "center" }}>
              ⚙️ Meny ▼
            </Text>
          </TouchableOpacity>

          {/* Dropdown Modal */}
          <Modal
            visible={showDropdown}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowDropdown(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              activeOpacity={1}
              onPress={() => setShowDropdown(false)}
            >
              <View
                style={{
                  position: "absolute",
                  top: 50,
                  right: 16,
                  backgroundColor: theme.surface,
                  borderRadius: 8,
                  padding: 8,
                  minWidth: 200,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                  borderWidth: 1,
                  borderColor: theme.borderLight,
                }}
              >
                {menuOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    onPress={() => handleMenuChange(option.value)}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 6,
                      marginBottom: 4,
                    }}
                  >
                    <Text style={{ color: theme.text, fontSize: 16 }}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>

      {/* Alternativ: Picker för plattformar som stödjer det bättre */}
      {Platform.OS === 'android' && (
        <View style={{ padding: 16 }}>
          <Text style={[GlobalStyles.text, { color: theme.text, marginBottom: 8 }]}>
            Snabbmeny:
          </Text>
          <View style={{ 
            borderWidth: 1, 
            borderColor: theme.borderLight, 
            borderRadius: 8,
            backgroundColor: theme.surface,
          }}>
            <Picker
              selectedValue={selectedMenu}
              onValueChange={handleMenuChange}
              dropdownIconColor={theme.primary}
              style={{ 
                color: theme.text,
                backgroundColor: theme.surface,
              }}
            >
              <Picker.Item label="Välj menyalternativ..." value="" />
              {menuOptions.map((option) => (
                <Picker.Item 
                  key={option.value} 
                  label={option.label} 
                  value={option.value} 
                />
              ))}
            </Picker>
          </View>
        </View>
      )}

      {/* Heading */}
      <Text style={[GlobalStyles.heading, { color: theme.primary, marginTop: 16 }]}>
        Välkommen till Nyhetsapplikationen
      </Text>

      {/* Description */}
      <Text style={[GlobalStyles.text, { color: theme.text, marginBottom: 12 }]}>
        Här kan du läsa de senaste nyheterna från Sverige och världen.
      </Text>

      {/* Smaller Hero Image */}
      <Image
        source={require("@/assets/images/BreakingNews.png")}
        style={[GlobalStyles.image, { width: width * 0.8, height: 160 }]}
        resizeMode="contain"
      />

      {/* Grid of category buttons */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item: Category) => item.id}
        numColumns={2}
        contentContainerStyle={{ marginTop: 20, paddingBottom: 40 }}
      />
    </View>
  );
}