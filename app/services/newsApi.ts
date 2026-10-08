//newsApi.ts: Här hanterar vi alla anrop till NewsAPI för att hämta nyheter
const API_KEY = "DIN_NEWSAPI_KEY"; 
const BASE_URL = "https://newsapi.org/";

export const fetchNewsByCategory = async (category: string) => { // Hämtar toppnyheter för en viss kategori
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=se&category=${category}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
