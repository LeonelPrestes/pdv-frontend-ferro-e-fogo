import React, { useEffect, useMemo, useState } from "react";
import { asNumber, money } from "../../shared/format";
import { productBlocked } from "../../shared/products";

const categoryImages = {
  Executivos: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  "À La Carte": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  "A La Carte": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  Petiscos: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80",
  "Não Alcoólicas": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
  "Cervejas 600ml": "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80",
  Drinks: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
};

function productImage(product, categoryName) {
  return product.imageUrl || categoryImages[categoryName] || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
}

function MenuItemButton({ categoryName, product, onAddProduct }) {
  return (
    <button className="menu-card" onClick={() => onAddProduct(product)}>
      <span
        className="menu-card-photo"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.2)), url("${productImage(product, categoryName)}")` }}
      />
      <span className="menu-card-info">
        <strong>{product.name}</strong>
        <span>{money.format(asNumber(product.price))}</span>
      </span>
    </button>
  );
}

export function MenuPanel({ groupedProducts, onAddProduct }) {
  const availableCategories = useMemo(
    () =>
      groupedProducts
        .map((category) => ({
          ...category,
          products: category.products.filter((product) => !productBlocked(product))
        }))
        .filter((category) => category.products.length > 0),
    [groupedProducts]
  );
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const activeCategory = availableCategories.find((category) => category.id === activeCategoryId) ?? availableCategories[0];

  useEffect(() => {
    if (!activeCategoryId && availableCategories[0]) {
      setActiveCategoryId(availableCategories[0].id);
    }
    if (activeCategoryId && !availableCategories.some((category) => category.id === activeCategoryId)) {
      setActiveCategoryId(availableCategories[0]?.id ?? "");
    }
  }, [activeCategoryId, availableCategories]);

  return (
    <div className="panel">
      <h2>Cardápio</h2>
      <div className="menu-category-bar">
        {availableCategories.map((category) => (
          <button
            key={category.id}
            className={category.id === activeCategory?.id ? "selected" : ""}
            onClick={() => setActiveCategoryId(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {activeCategory ? (
        <div className="menu-card-grid">
          {activeCategory.products.map((product) => (
            <MenuItemButton key={product.id} categoryName={activeCategory.name} product={product} onAddProduct={onAddProduct} />
          ))}
        </div>
      ) : (
        <div className="empty">Nenhum item disponível no cardápio.</div>
      )}
    </div>
  );
}
