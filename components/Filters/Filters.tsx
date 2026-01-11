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

  const handleEquipmentToggle = (key: "AC" | "automatic" | "kitchen" | "TV" | "shower") => {
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
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        );
      case "automatic":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
          </svg>
        );
      case "kitchen":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        );
      case "TV":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
            <polyline points="17 2 12 7 7 2" />
          </svg>
        );
      case "shower":
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12l2 2 4-4" />
            <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
            <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className={css.filters}>
      <div className={css.section}>
        <label htmlFor="location" className={css.label}>
          Location
        </label>
        <div className={css.locationInput}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
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

