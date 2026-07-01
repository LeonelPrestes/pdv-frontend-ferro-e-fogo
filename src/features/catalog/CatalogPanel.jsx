import React from "react";
import { catalogApi } from "../../services/pdvApi";
import { asNumber, money } from "../../shared/format";
import { productBlocked } from "../../shared/products";

export function CatalogPanel({ areas, busy, categories, forms, groupedProducts, onAddProduct, run, updateForm }) {
  return (
    <div className="panel">
      <h2>Cardapio real</h2>
      <div className="form-grid">
        <input placeholder="Categoria" value={forms.categoryName} onChange={(e) => updateForm("categoryName", e.target.value)} />
        <button disabled={busy} onClick={() => run(() => catalogApi.createCategory(forms.categoryName))}>Criar categoria</button>
        <input placeholder="Produto" value={forms.productName} onChange={(e) => updateForm("productName", e.target.value)} />
        <input placeholder="Preco" value={forms.productPrice} onChange={(e) => updateForm("productPrice", e.target.value)} />
        <input placeholder="Estoque" value={forms.productStock} onChange={(e) => updateForm("productStock", e.target.value)} />
        <select value={forms.categoryId} onChange={(e) => updateForm("categoryId", e.target.value)}>
          <option value="">Categoria</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <select value={forms.productionAreaId} onChange={(e) => updateForm("productionAreaId", e.target.value)}>
          <option value="">Area</option>
          {areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
        </select>
        <label><input type="checkbox" checked={forms.available} onChange={(e) => updateForm("available", e.target.checked)} /> Disponivel</label>
        <label><input type="checkbox" checked={forms.allowNegativeStock} onChange={(e) => updateForm("allowNegativeStock", e.target.checked)} /> Permite negativo</label>
        <button
          disabled={busy}
          onClick={() => run(() => catalogApi.createProduct({
            name: forms.productName,
            price: Number(forms.productPrice),
            currentStock: Number(forms.productStock),
            categoryId: forms.categoryId || undefined,
            productionAreaId: forms.productionAreaId || undefined,
            available: forms.available,
            allowNegativeStock: forms.allowNegativeStock
          }))}
        >
          Criar produto
        </button>
      </div>

      {groupedProducts.map((category) => (
        <div key={category.id} className="section">
          <h3>{category.name}</h3>
          <div className="product-grid">
            {category.products.map((product) => (
              <button key={product.id} className={productBlocked(product) ? "product blocked" : "product"} onClick={() => onAddProduct(product)}>
                <strong>{product.name}</strong>
                <span>{money.format(asNumber(product.price))}</span>
                <small>Estoque {asNumber(product.currentStock)} {productBlocked(product) ? "| indisponivel" : ""}</small>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
