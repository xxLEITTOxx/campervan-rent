import axios from "axios";
import type { Camper, CamperFilters } from "@/types/camper";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL ||
  "https://travel-trucks-backend-gv9o.onrender.com/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchCampers(
  filters: CamperFilters = {}
): Promise<Camper[]> {
  const params: Record<string, string | number> = {};

  if (filters.location) {
    params.location = filters.location;
  }
  if (filters.form) {
    params.form = filters.form;
  }
  if (filters.page) {
    params.page = filters.page;
  }
  if (filters.limit) {
    params.limit = filters.limit;
  }

  // Для фільтрів обладнання (AC, kitchen, TV тощо) - передаємо true/false
  if (filters.AC !== undefined && filters.AC) {
    params.AC = "true";
  }
  if (filters.kitchen !== undefined && filters.kitchen) {
    params.kitchen = "true";
  }
  if (filters.TV !== undefined && filters.TV) {
    params.TV = "true";
  }
  if (filters.shower !== undefined && filters.shower) {
    params.bathroom = "true";
  }
  if (filters.automatic !== undefined) {
    params.transmission = filters.automatic ? "automatic" : "manual";
  }

  const response = await api.get("/campers", { params });

  // Новый бекенд возвращает объект { items: [], total: number }
  if (response.data && typeof response.data === "object") {
    if (Array.isArray(response.data.items)) {
      return response.data.items;
    }
    // Если это массив напрямую (для обратной совместимости)
    if (Array.isArray(response.data)) {
      return response.data;
    }
  }

  // Если структура неожиданная, возвращаем пустой массив
  console.warn("API returned unexpected data structure:", response.data);
  return [];
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const response = await api.get<Camper>(`/campers/${id}`);
  return response.data;
}
