"use client";

import { useEffect, useCallback } from "react";
import { useCamperStore } from "@/store/useCamperStore";
import { fetchCampers } from "@/lib/api";
import Filters from "@/components/Filters/Filters";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import css from "./page.module.css";

export default function CatalogPage() {
  const {
    campers,
    filters,
    isLoading,
    setCampers,
    addCampers,
    setLoading,
    setError,
    currentPage,
    setCurrentPage,
  } = useCamperStore();

  const loadCampers = useCallback(
    async (page: number, append: boolean = false) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCampers({
          ...filters,
          page,
          limit: 4,
        });

        // Перевіряємо, що дані є масивом
        const campersArray = Array.isArray(data) ? data : [];

        if (append) {
          addCampers(campersArray);
        } else {
          setCampers(campersArray);
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load campers"
        );
        console.error("Error loading campers:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters, setCampers, addCampers, setLoading, setError]
  );

  useEffect(() => {
    loadCampers(1, false);
  }, [loadCampers]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadCampers(nextPage, true);
  };

  return (
    <div className={css.container}>
      <div className={css.layout}>
        <aside className={css.sidebar}>
          <Filters />
        </aside>
        <main className={css.main}>
          {isLoading && campers.length === 0 ? (
            <Loader />
          ) : campers.length === 0 ? (
            <div className={css.empty}>
              <p>No campers found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className={css.grid}>
                {Array.isArray(campers) &&
                  campers.map((camper) => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))}
              </div>
              {campers.length >= 4 && (
                <div className={css.loadMoreWrapper}>
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className={css.loadMoreButton}
                  >
                    {isLoading ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
