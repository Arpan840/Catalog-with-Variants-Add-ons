import React from "react";
import { Variant } from "../types";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string | null;
  onVariantChange: (variantId: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants = [],  // default empty array if undefined
  selectedVariantId,
  onVariantChange,
}) => {
  if (!variants || variants.length === 0) return <p>No variants available</p>;

  return (
    <div className="variant-selector">
      <label htmlFor="variant-select">
        <strong>Choose Variant:</strong>
      </label>
      <select
        id="variant-select"
        value={selectedVariantId || ""}
        onChange={(e) => onVariantChange(e.target.value)}
      >
        {variants.map((variant) => (
          <option key={variant.id} value={variant.id}>
            {variant.size} / {variant.color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VariantSelector;
