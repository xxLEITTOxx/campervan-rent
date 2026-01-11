"use client";

import { useState } from "react";
import { useCamperStore } from "@/store/useCamperStore";
import css from "./Filters.module.css";

const Filters = () => {
  const { filters, setFilters, resetCampers } = useCamperStore();
  const [location, setLocation] = useState(filters.location || "");

  const equipmentFilters = [
    { key: "AC" as const, label: "AC" },
    { key: "automatic" as const, label: "Automatic" },
    { key: "kitchen" as const, label: "Kitchen" },
    { key: "TV" as const, label: "TV" },
    { key: "shower" as const, label: "Bathroom" },
  ];

  const vehicleTypes = [
    { value: "panelTruck", label: "Van" },
    { value: "fullyIntegrated", label: "Fully Integrated" },
    { value: "alcove", label: "Alcove" },
  ];

  const handleEquipmentToggle = (
    key: "AC" | "automatic" | "kitchen" | "TV" | "shower"
  ) => {
    const currentValue = filters[key];
    setFilters({
      ...filters,
      [key]: currentValue ? undefined : true,
    });
    resetCampers();
  };

  const handleVehicleTypeChange = (value: string) => {
    setFilters({
      ...filters,
      form: filters.form === value ? undefined : value,
    });
    resetCampers();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    setFilters({
      ...filters,
      location: location || undefined,
      page: 1,
    });
    resetCampers();
  };

  const getEquipmentIcon = (key: string) => {
    switch (key) {
      case "AC":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <use href="/sprite.svg#wind" />
          </svg>
        );
      case "automatic":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <use href="/sprite.svg#diagram" />
          </svg>
        );
      case "kitchen":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <use href="/sprite.svg#hugeicons_gas-stove" />
          </svg>
        );
      case "TV":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <use href="/sprite.svg#tv" />
          </svg>
        );
      case "shower":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <use href="/sprite.svg#ph_shower" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getVehicleIcon = (value: string) => {
    switch (value) {
      case "panelTruck":
        return (
          <svg width="32" height="32">
            <use href="/sprite.svg#bi_grid-1x2" />
          </svg>
        );
      case "fullyIntegrated":
        return (
          <svg width="32" height="32">
            <use href="/sprite.svg#bi_grid" />
          </svg>
        );
      case "alcove":
        return (
          <svg width="32" height="32">
            <use href="/sprite.svg#bi_grid-3x3-gap" />
          </svg>
        );
      default:
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
        );
    }
  };

  return (
    <aside className={css.filters}>
      <div className={css.section}>
        <label htmlFor="location" className={css.label}>
          Location
        </label>
        <div className={css.locationInput}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            id="location"
            type="text"
            placeholder="City"
            value={location}
            onChange={handleLocationChange}
            className={css.input}
          />
        </div>
      </div>

      <div className={css.section}>
        <h2 className={css.sectionTitle}>Filters</h2>
      </div>

      <div className={css.section}>
        <h3 className={css.subtitle}>Vehicle equipment</h3>
        <div className={css.equipmentGrid}>
          {equipmentFilters.map((item) => {
            const isActive = filters[item.key] === true;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleEquipmentToggle(item.key)}
                className={`${css.equipmentButton} ${isActive ? css.active : ""}`}
              >
                {getEquipmentIcon(item.key)}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={css.section}>
        <h3 className={css.subtitle}>Vehicle type</h3>
        <div className={css.vehicleTypeGrid}>
          {vehicleTypes.map((type) => {
            const isActive = filters.form === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => handleVehicleTypeChange(type.value)}
                className={`${css.vehicleTypeButton} ${isActive ? css.active : ""}`}
              >
                {getVehicleIcon(type.value)}
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <button type="button" onClick={handleSearch} className={css.searchButton}>
        Search
      </button>
    </aside>
  );
};

export default Filters;
