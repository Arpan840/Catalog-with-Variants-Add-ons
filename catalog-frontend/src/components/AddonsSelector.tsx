import React, { useState, useEffect } from "react";
import { Addon } from "../types";

interface AddonsSelectorProps {
  addons: Addon[];
  onSelectionChange: (selectedAddons: Addon[]) => void;
}

const AddonsSelector: React.FC<AddonsSelectorProps> = ({ addons, onSelectionChange }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  console.log("Available addons:", addons);
  

  useEffect(() => {
    // Send back selected Addons objects
    const selectedAddons = addons.filter((addon) => selectedIds.includes(addon.id));
    onSelectionChange(selectedAddons);
  }, [selectedIds, addons, onSelectionChange]);

  const toggleAddon = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  if (addons.length === 0) return <p>No add-ons available</p>;

  return (
    <div className="addons-selector">
      <strong>Add-ons:</strong>
      {addons.map((addon) => (
        <label key={addon.id} className="addon-label">
          <input
            type="checkbox"
            checked={selectedIds.includes(addon.id)}
            onChange={() => toggleAddon(addon.id)}
          />
          {addon.name} (+${addon.price})
        </label>
      ))}
    </div>
  );
};

export default AddonsSelector;
