import React from "react";
import { ProductType } from "../types";
import "../style/ProductTypeFilter.css";

interface Props {
  productTypes: ProductType[];
  selectedType: string;
  onSelectType: (typeName: string) => void;
}

const ProductTypeFilter: React.FC<Props> = ({
  productTypes,
  selectedType,
  onSelectType,
}) => {
  return (
    <nav className="product-type-nav">
      <button
        className={selectedType === "all" ? "active" : ""}
        onClick={() => onSelectType("all")}
      >
        All
      </button>
      {productTypes.map((type) => (
        <button
          key={type.id}
          className={selectedType === type.name ? "active" : ""}
          onClick={() => onSelectType(type.name)}
        >
          {type.name}
        </button>
      ))}
    </nav>
  );
};

export default ProductTypeFilter;
