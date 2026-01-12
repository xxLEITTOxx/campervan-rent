"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCamperStore } from "@/store/useCamperStore";
import { fetchCamperById } from "@/lib/api";
import type { Camper } from "@/types/camper";
import Features from "@/components/Features/Features";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import Loader from "@/components/Loader/Loader";
import css from "./page.module.css";

type Tab = "features" | "reviews";

export default function CamperDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { toggleFavorite, isFavorite } = useCamperStore();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("features");

  useEffect(() => {
    const loadCamper = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await fetchCamperById(id);
        setCamper(data);
      } catch (error) {
        console.error("Error loading camper:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCamper();
  }, [id]);

  if (isLoading) {
    return (
      <div className={css.container}>
        <Loader />
      </div>
    );
  }

  if (!camper) {
    return (
      <div className={css.container}>
        <div className={css.empty}>
          <p>Camper not found</p>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(camper.id);
  const formatPrice = (price: number) => `€${price.toFixed(2)}`;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.headerTop}>
          <h1 className={css.title}>{camper.name}</h1>
        </div>
        <div className={css.meta}>
          <div className={css.rating}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC531">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className={css.rating_styling}>
              {camper.rating}({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={css.location}>
            <svg width="16" height="16">
              <use href="/sprite.svg#map-16" />
            </svg>
            <span>{camper.location}</span>
          </div>
        </div>
        <div className={css.priceWrapper}>
          <span className={css.price}>{formatPrice(camper.price)}</span>
        </div>
      </div>

      {camper.gallery && camper.gallery.length > 0 && (
        <div className={css.gallery}>
          {camper.gallery
            .filter((image) => image?.original && image.original.trim() !== "")
            .slice(0, 4)
            .map((image, index) => (
              <div key={index} className={css.galleryItem}>
                <Image
                  src={image.original}
                  alt={`${camper.name} - Image ${index + 1}`}
                  fill
                  className={css.galleryImage}
                  sizes="(max-width: 1440px) 25vw, 310px"
                />
              </div>
            ))}
        </div>
      )}
      <p className={css.description}>{camper.description}</p>
      <div className={css.tabs}>
        <button
          type="button"
          onClick={() => setActiveTab("features")}
          className={`${css.tab} ${activeTab === "features" ? css.active : ""}`}
        >
          Features
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`${css.tab} ${activeTab === "reviews" ? css.active : ""}`}
        >
          Reviews
        </button>
      </div>
      <div className={css.content}>
        <div className={css.mainContent}>
          <div className={css.tabContent}>
            {activeTab === "features" ? (
              <Features camper={camper} />
            ) : (
              <Reviews reviews={camper.reviews || []} />
            )}
          </div>
        </div>
        <div className={css.sidebar}>
          <BookingForm camperName={camper.name} />
        </div>
      </div>
    </div>
  );
}
