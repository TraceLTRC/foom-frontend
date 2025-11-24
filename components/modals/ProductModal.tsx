"use client";

import { modal } from "@/lib/modal";
import { Product } from "@/types/product";
import { useState } from "react";

export default function ProductModal({initialId, initialQty, possibleProducts, onClose}: {initialId?: number, initialQty?: number, possibleProducts: Product[], onClose: (p: { id: number, qty: number }) => void}) {
  const [productId, setProductId] = useState(initialId);
  const [quantity, setQuantity] = useState(initialQty ?? 0);

  const handleClose = () => {
    if (productId) {
      onClose({
        id: productId,
        qty: quantity
      });
    }
    modal.hide();
  }

  return (
    <>
      <h3 className="font-bold text-lg">{initialId ? "Edit" : "Add"} Item</h3>

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Product</label>
        <select className="select" value={productId} onChange={(e) => setProductId(+e.target.value)}>
          <option value="">Pick a product</option>
          {possibleProducts.map(x => (
            <option key={x.id} value={x.id}>{x.name} - {x.sku}</option>
          ))}
        </select>

        <label className="label">Quantity</label>
        <input type="number" className="input" placeholder="PR00001" value={quantity} onChange={(e) => setQuantity(isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)} />
      </fieldset>

      <div className="modal-action">
        <button className="btn" onClick={handleClose}>
          Save
        </button>
      </div>
    </>
  )
}
