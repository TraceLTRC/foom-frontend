"use server";
import PurchaseRequestForm from "@/components/PurchaseRequestForm";
import { Product } from "@/types/product";
import { PurchaseRequest } from "@/types/purchaserequest";
import { Warehouse } from "@/types/warehouse";
import { getApiEndpoint } from "@/utils/http";


export default async function({ params }: { params: Promise<{ id: string; }>; }) {
    const { id } = await params;

    const prResp = await fetch(getApiEndpoint("/purchase/request/" + id));
    if (!prResp.ok) {
        throw new Error("failed to get purchase request")
    }

    const whResp = await fetch(getApiEndpoint("/warehouse"));
    if (!whResp.ok) {
        throw new Error("failed to get warehouses")
    }

    const prodResp = await fetch(getApiEndpoint("/products"));
    if (!prodResp.ok) {
        throw new Error("failed to get products")
    }

    const pr = await prResp.json() as PurchaseRequest;
    const wh = await whResp.json() as Warehouse[];
    const prods = await prodResp.json() as Product[];
    return (
        <PurchaseRequestForm pr={pr} warehouses={wh} products={prods}/>
    );
}

