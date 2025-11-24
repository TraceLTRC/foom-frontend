"use client"

import { modal } from "@/lib/modal";
import { Product } from "@/types/product";
import { CreatePurchaseRequestDTO, PurchaseRequest, PurchaseRequestItem, Status, StatusEnum, UpdatePurchaseRequestDTO } from "@/types/purchaserequest";
import { Warehouse } from "@/types/warehouse";
import { FormEvent, useState } from "react";
import ProductModal from "./modals/ProductModal";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function PurchaseRequestForm(
    { pr, warehouses, products }: { pr?: PurchaseRequest, warehouses: Warehouse[], products: Product[] }
) {
    const router = useRouter();

    const shouldDisableAll = pr && pr.status !== StatusEnum.DRAFT;

    const [reference, setReference] = useState(pr?.reference);
    const [warehouseId, setWarehouseId] = useState(pr?.warehouse.id);
    const [status, setStatus] = useState(pr?.status);
    const [items, setItems] = useState(pr?.items ?? []);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (pr) { // Is update
            const payload: UpdatePurchaseRequestDTO = {
                warehouse_id: warehouseId!,
                reference: reference!,
                status: status!,
                items: items.map(x => ({
                    product_id: x.product.id,
                    quantity: x.quantity
                }))
            };

            const resp = await fetch("/api/purchase/request/" + pr.id, {
                method: "PUT",
                body: JSON.stringify(payload)
            });

            if (resp.ok) {
                toastSuccess("Sucessfully update purchase request!")
                setTimeout(() => {
                    router.push("/purchase-request")
                }, 1000);
            } else {
                toastError("Failed to update purchase request!")
            }
        } else { // Is create
            const payload: CreatePurchaseRequestDTO = {
                warehouse_id: warehouseId!,
                reference: reference!,
                items: items.map(x => ({
                    product_id: x.product.id,
                    quantity: x.quantity
                }))
            };

            const resp = await fetch("/api/purchase/request", {
                method: "POST",
                body: JSON.stringify(payload)
            });

            if (resp.ok) {
                toastSuccess("Sucessfully create purchase request!")
                setTimeout(() => {
                    router.push("/purchase-request")
                }, 1000);
            } else {
                toastError("Failed to create purchase request!")
            }
        }
    }

    const addItem = () => {
        const func = ({ id, qty }: { id: number, qty: number }) => {
            const product = products.find(x => x.id === id);
            if (product) {
                setItems(prev => {
                    return [...prev, {
                        product,
                        quantity: qty
                    }]
                });
            }
        }

        modal.show({
            content: <ProductModal possibleProducts={products} onClose={func}></ProductModal>
        });
    }

    const editItem = (pri: PurchaseRequestItem) => {
        const func = ({ id, qty }: { id: number, qty: number }) => {
            setItems(prev => {
                const copy = [...prev];
                const productToEdit = copy.find(x => x.product.id === id);
                if (productToEdit) {
                    productToEdit.quantity = qty;
                }

                return copy;
            });
        }

        modal.show({
            content: <ProductModal possibleProducts={products} onClose={func}></ProductModal>
        });
    }

    const deleteItem = (idxToDel: number) => {
        setItems(prev => {
            return prev.filter((_, idx) => idx !== idxToDel)
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-4xl">Purchase Request Form</h1>
            <div className="flex gap-4">
                <form onSubmit={onSubmit}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <label className="label">Reference</label>
                        <input required type="text" className="input" placeholder="PR00001" disabled={shouldDisableAll} value={reference ?? ""} onChange={(e) => setReference(e.target.value)} />

                        <label className="label">Warehouse</label>
                        <select required className="select" value={warehouseId ?? ""} disabled={shouldDisableAll} onChange={(e) => setWarehouseId(+e.target.value)}>
                            <option value="">Pick a warehouse</option>
                            {warehouses.map(x => (
                                <option key={x.id} value={x.id}>{x.name}</option>
                            ))}
                        </select>

                        <label className="label">Status</label>
                        <select required className="select" disabled={pr === undefined || shouldDisableAll} value={status ?? StatusEnum.DRAFT} onChange={(e) => setStatus((+e.target.value) as Status)}>
                            {Object.entries(StatusEnum).map(x => (
                                <option key={x[1]} value={x[1]}>{x[0]}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
                <table className="table border border-base-300 p-4">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((x, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{x.product.name} - {x.product.sku}</td>
                                <td>{x.quantity}</td>
                                <td className="flex flex-col gap-4">
                                    <button className="btn btn-accent btn-sm" disabled={shouldDisableAll} onClick={() => editItem(x)}>Edit</button>
                                    <button className="btn btn-error btn-sm" disabled={shouldDisableAll} onClick={() => deleteItem(idx)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <button className="btn btn-primary min-w-0 max-w-0 px-8 py-4" onClick={addItem} disabled={shouldDisableAll}>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
