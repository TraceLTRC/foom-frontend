"use server";
import PurchaseRequestForm from "@/components/PurchaseRequestForm";
import { Product } from "@/types/product";
import { Warehouse } from "@/types/warehouse";
import { getApiEndpoint } from "@/utils/http";


export default async function() {
    const whResp = await fetch(getApiEndpoint("/warehouse"));
    if (!whResp.ok) {
        throw new Error("failed to get warehouses")
    }

    const prodResp = await fetch(getApiEndpoint("/products"));
    if (!prodResp.ok) {
        throw new Error("failed to get products")
    }

    const wh = await whResp.json() as Warehouse[];
    const prods = await prodResp.json() as Product[];
    return (
        <PurchaseRequestForm warehouses={wh} products={prods}/>
    );
}

