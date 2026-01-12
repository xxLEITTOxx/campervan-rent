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
                    <svg width="32" height="32" fill="#e44848">
                      <use href="/sprite.svg#heart" />
                    </svg>
                  ) : (
                    <svg width="32" height="32">
                      <use href="/sprite.svg#heart" />
                    </svg>
                  )}
                </button>
              </div>
            </h3>
          </div>
          <div className={css.meta}>
            <div className={css.rating}>
              <svg width="32" height="32" fill="#ffc531">
                <use href="/sprite.svg#star" />
              </svg>
              <span>
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
