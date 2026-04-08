"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

interface FavoritesContextData {
  favorites: number[];
  addFavorite: (productId: number) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const FAVORITES_STORAGE_KEY = "@ecommerce:favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const prevRef = useRef<number[]>();

  useEffect(() => {
    prevRef.current = favorites;
  });

  const prevValue = prevRef.current ?? favorites;

  useEffect(() => {
    if (prevValue !== favorites) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, prevValue]);

  const addFavorite = (productId: number) => {
    if (!favorites.includes(productId)) {
      setFavorites((prev) => [...prev, productId]);
      toast.success("Produto adicionado aos favoritos!");
    }
  };

  const removeFavorite = (productId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
    toast.info("Produto removido dos favoritos.");
  };

  const isFavorite = (productId: number) => favorites.includes(productId);

  const toggleFavorite = (productId: number) => {
    if (isFavorite(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context || Object.keys(context).length === 0) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
