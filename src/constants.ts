export const icons = {
    nav: 30,
    logoWidth: 200,
    logoHeight: 100,
    profile: 50,
    login: 50,
    settings: 35,
    theme: 40,
    auth: 40,
    
}

export interface NavbarProps {
    collapsed: boolean;
    toggleNavbar: () => void;
  }

export interface NewsArticle {
    title: string;
    url: string;
    author?: string;
    source: {
      name: string;
    };
    description: string;
    publishedAt?: string;
    content: string;
  }

  export interface Stock {
    symbol: string;
    name: string;
    change: number;
    price: number;
    changesPercentage: number;
  }