export type RootStackParamList = {
  Home: undefined;
  News: { category: string };
  ArticleDetail: { article: Article };
};

export type Article = {
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
  category: string;
  time?: string;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
