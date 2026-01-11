import type { Camper } from "@/types/camper";
import css from "./Features.module.css";

interface FeaturesProps {
  camper: Camper;
}

const Features = ({ camper }: FeaturesProps) => {
  const features = [];

  if (camper.transmission === "automatic") {
    features.push({ name: "Automatic", icon: "⚙️" });
  }
  if (camper.AC) {
    features.push({ name: "AC", icon: "❄️" });
  }
  if (camper.engine === "petrol") {
    features.push({ name: "Petrol", icon: "⛽" });
  }
  if (camper.kitchen) {
    features.push({ name: "Kitchen", icon: "🍳" });
  }
  if (camper.radio) {
    features.push({ name: "Radio", icon: "📻" });
  }
  if (camper.bathroom) {
    features.push({
      name: "Bathroom",
      icon: (
        <svg
          className={css.svgIcon}
          width="20"
          height="20"
          viewBox="0 0 32 32"
          aria-hidden
        >
          <use href="#ph_shower" />
        </svg>
      ),
    });
  }
  if (camper.refrigerator) {
    features.push({ name: "Refrigerator", icon: "❄️" });
  }
  if (camper.microwave) {
    features.push({ name: "Microwave", icon: "📡" });
  }
  if (camper.gas) {
    features.push({ name: "Gas", icon: "🔥" });
  }
  if (camper.water) {
    features.push({ name: "Water", icon: "💧" });
  }
  if (camper.TV) {
    features.push({ name: "TV", icon: "📺" });
  }

  const vehicleDetails = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ].filter((detail) => detail.value);

  return (
    <div className={css.featuresStyling}>
      <div className={css.features}>
        {features.length > 0 && (
          <div className={css.featuresList}>
            {features.map((feature) => (
              <div key={feature.name} className={css.featureTag}>
                <span className={css.featureIcon}>{feature.icon}</span>
                <span>{feature.name}</span>
              </div>
            ))}
          </div>
        )}

        {vehicleDetails.length > 0 && (
          <div className={css.details}>
            <h3 className={css.detailsTitle}>Vehicle details</h3>
            <dl className={css.detailsList}>
              {vehicleDetails.map((detail) => (
                <div key={detail.label} className={css.detailItem}>
                  <dt className={css.detailLabel}>{detail.label}</dt>
                  <dd className={css.detailValue}>{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;
