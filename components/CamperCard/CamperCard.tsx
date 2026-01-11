"use client";

import Link from "next/link";
import Image from "next/image";
import { useCamperStore } from "@/store/useCamperStore";
import type { Camper } from "@/types/camper";
import css from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

const CamperCard = ({ camper }: CamperCardProps) => {
  const { toggleFavorite, isFavorite } = useCamperStore();
  const favorite = isFavorite(camper.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(camper.id);
  };

  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  const equipment = [];
  if (camper.AC) equipment.push("AC");
  if (camper.transmission === "automatic") equipment.push("Automatic");
  if (camper.engine === "petrol") equipment.push("Petrol");
  if (camper.kitchen) equipment.push("Kitchen");

  return (
    <article className={css.card}>
      <Link href={`/catalog/${camper.id}`} className={css.link}>
        <div className={css.imageWrapper}>
          <div className={css.imageOverlay}></div>
          {camper.gallery?.[0]?.original ? (
            <Image
              src={camper.gallery[0].original}
              alt={camper.name}
              fill
              className={css.image}
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          ) : (
            <div className={css.placeholder} />
          )}
        </div>
        <div className={css.content}>
          <div className={css.header}>
            <h3 className={css.title}>
              {camper.name}{" "}
              <div className={css.separator}>
                <span className={css.price}>{formatPrice(camper.price)}</span>
                <button
                  type="button"
                  aria-pressed={favorite}
                  title={favorite ? "Remove favorite" : "Add to favorites"}
                  className={css.favoriteButton}
                  onClick={handleFavoriteClick}
                >
                  {favorite ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="#E54848"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.01 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 17.99 4 20 6.01 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="1.5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  )}
                </button>
              </div>
            </h3>
          </div>
          <div className={css.meta}>
            <div className={css.rating}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC531">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>
                {camper.rating}({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={css.location}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{camper.location}</span>
            </div>
          </div>
          <p className={css.description}>{camper.description}</p>
          {equipment.length > 0 && (
            <div className={css.equipment}>
              {equipment.map((item) => (
                <span key={item} className={css.equipmentTag}>
                  {item}
                </span>
              ))}
            </div>
          )}
          <button type="button" className={css.showMoreButton}>
            Show more
          </button>
        </div>
      </Link>
    </article>
  );
};

export default CamperCard;
