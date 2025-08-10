import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Product, Variant, Addon } from "../types";
import VariantSelector from "../components/VariantSelector";
import AddonsSelector from "../components/AddonsSelector";
import "../style/ProductDetailsPage.css";

const ProductDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as Product | undefined;

  const [mainImage, setMainImage] = useState<number>(0);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product?.variants && product.variants.length > 0
      ? product.variants[0]
      : null
  );
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  if (!product) {
    return (
      <div className="product-detail-container">
        <p>Product details not available.</p>
        <button className="btn-back" onClick={() => navigate(-1)}>
          ⬅ Go Back
        </button>
      </div>
    );
  }

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) setSelectedVariant(variant);
  };

  const handleAddonsChange = (addons: Addon[]) => {
    setSelectedAddons(addons);
  };

  // Calculate total price = variant price + sum of addon prices
  const variantPrice = Number(selectedVariant?.price) || 0;

  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + Number(addon.price),
    0
  );

  const totalPrice = (variantPrice + addonsTotal).toFixed(2);

  return (
    <div className="product-detail-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <div className="product-detail-main">
        <div className="product-images">
          <img
            className="main-image"
            src={product.images[mainImage]}
            alt={product.name}
          />
          <div className="image-thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} image ${idx + 1}`}
                className={
                  mainImage === idx ? "thumbnail selected" : "thumbnail"
                }
                onClick={() => setMainImage(idx)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant?.id || null}
            onVariantChange={handleVariantChange}
          />

          {product.addons && product.addons.length > 0 && (
            <AddonsSelector
              addons={product.addons}
              onSelectionChange={handleAddonsChange}
            />
          )}

          {selectedVariant && (
            <div className="variant-details-card">
              <p>
                <span role="img" aria-label="price">
                  💰
                </span>{" "}
                <strong>Base Price:</strong> ${selectedVariant.price}
              </p>
              <p>
                <span role="img" aria-label="total">
                  🏷️
                </span>{" "}
                <strong>Total Price:</strong> ${totalPrice}
              </p>
              <p>
                <span role="img" aria-label="stock">
                  📦
                </span>{" "}
                <strong>Stock:</strong> {selectedVariant.stock}
              </p>
              <p>
                <span role="img" aria-label="sku">
                  🏷️
                </span>{" "}
                <strong>SKU:</strong> {selectedVariant.sku}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
