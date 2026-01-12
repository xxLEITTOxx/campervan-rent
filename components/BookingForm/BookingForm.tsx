"use client";

import { useState, FormEvent } from "react";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperName: string;
}

const BookingForm = (_props: BookingFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Симуляція відправки форми
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowNotification(true);
    setName("");
    setEmail("");
    setDate("");
    setComment("");

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      {showNotification && (
        <div className={css.notification}>
          <p>Booking successful! We will contact you soon.</p>
        </div>
      )}
      <div className={css.formWrapper}>
        <h2 className={css.title}>Book your campervan now</h2>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.field}>
            <label htmlFor="name" className={css.label}></label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={css.input}
              placeholder="Name*"
            />
          </div>
          <div className={css.field}>
            <label htmlFor="email" className={css.label}></label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={css.input}
              placeholder="Email*"
            />
          </div>
          <div className={css.field}>
            <label htmlFor="date" className={css.label}></label>
            <input
              id="date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={css.input}
              placeholder="Booking date*"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className={css.field}>
            <label htmlFor="comment" className={css.label}></label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={css.textarea}
              placeholder="Comment"
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={css.submitButton}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
