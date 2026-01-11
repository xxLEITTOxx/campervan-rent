import type { Review } from "@/types/camper";
import css from "./Reviews.module.css";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (reviews.length === 0) {
    return (
      <div className={css.empty}>
        <p>No reviews yet.</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={index < rating ? "#FFC531" : "#f2f4f7"}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className={css.reviews}>
      {reviews.map((review, index) => (
        <article key={index} className={css.review}>
          <div className={css.reviewHeader}>
            <div className={css.avatar}>
              <span>{getInitials(review.reviewer_name)}</span>
            </div>
            <div className={css.reviewMeta}>
              <h4 className={css.reviewerName}>{review.reviewer_name}</h4>
              <div className={css.rating}>{renderStars(review.reviewer_rating)}</div>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default Reviews;

