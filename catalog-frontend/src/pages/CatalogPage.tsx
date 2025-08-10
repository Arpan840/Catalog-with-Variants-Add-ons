import React, { useEffect, useState } from "react";
import { fetchProductTypes, fetchProductsByType } from "../services/products";
import { ProductType, Product } from "../types";
import ProductTypeFilter from "../components/ProductTypeFilter";
import { Link } from "react-router-dom";
import "../style/CatalogPage.css";

const CatalogPage: React.FC = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    // Always fetch product types (with their products inside)
    fetchProductTypes()
      .then((types) => {
        setProductTypes(types);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    if (selectedType === "all") {
      // Show all products grouped by type — productTypes already has products inside
      setFilteredProducts([]);
      setLoading(false);
    } else {
      // Fetch products by selected type only
      fetchProductsByType(selectedType)
        .then((products) => {
          setFilteredProducts(products);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [selectedType]);

  const handleTypeChange = (typeName: string) => {
    setSelectedType(typeName);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="catalog-container">
      <ProductTypeFilter
        productTypes={productTypes}
        selectedType={selectedType}
        onSelectType={handleTypeChange}
      />

      {selectedType === "all" ? (
        // Show grouped products by type
        productTypes.map((type) => (
          <section key={type.id} className="product-type-section">
            <h2 className="product-type-title">{type.name}</h2>
            <div className="products-list">
              {(type.products ?? []).length > 0 ? (
                (type.products ?? []).map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    state={{ product }}
                    key={product.id}
                    className="product-card-link"
                  >
                    <div key={product.id} className="product-card">
                      {product.images.length > 0 && (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="product-image"
                        />
                      )}
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No products available in this category.</p>
              )}
            </div>
          </section>
        ))
      ) : (
        // Show filtered products list only
        <div className="products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
                state={{ product }}
                key={product.id}
                className="product-card-link"
              >
                <div key={product.id} className="product-card">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
