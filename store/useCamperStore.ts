"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Camper, CamperFilters } from "@/types/camper";

interface CamperState {
  campers: Camper[];
  favorites: string[]; // IDs of favorite campers
  filters: CamperFilters;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCampers: (campers: Camper[]) => void;
  addCampers: (campers: Camper[]) => void;
  setFilters: (filters: CamperFilters) => void;
  resetFilters: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  resetCampers: () => void;
}

const defaultFilters: CamperFilters = {
  page: 1,
  limit: 4,
};

export const useCamperStore = create<CamperState>()(
  persist(
    (set, get) => ({
      campers: [],
      favorites: [],
      filters: defaultFilters,
      currentPage: 1,
      isLoading: false,
      error: null,

      setCampers: (campers) => set({ campers }),
      
      addCampers: (campers) =>
        set((state) => ({
          campers: Array.isArray(campers) 
            ? [...state.campers, ...campers] 
            : state.campers,
        })),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          currentPage: 1,
        })),

      resetFilters: () =>
        set({
          filters: defaultFilters,
          currentPage: 1,
        }),

      toggleFavorite: (id) =>
        set((state) => {
          const isFavorite = state.favorites.includes(id);
          return {
            favorites: isFavorite
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        }),

      isFavorite: (id) => get().favorites.includes(id),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      setCurrentPage: (page) => set({ currentPage: page }),

      resetCampers: () => set({ campers: [], currentPage: 1 }),
    }),
    {
      name: "camper-storage",
      partialize: (state) => ({ favorites: state.favorites }), // Зберігаємо тільки favorites
    }
  )
);

