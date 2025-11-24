"use client"

import { toastError } from "@/lib/toast";
import { PurchaseRequestSummary, StatusEnum, StatusToString } from "@/types/purchaserequest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function PurchaseRequestTable({ purchaseRequests }: { purchaseRequests: PurchaseRequestSummary[] }) {
    const router = useRouter();

    const onSubmit = async (e: FormEvent, id: number) => {
        e.preventDefault();

        const resp = await fetch("/api/purchase/request/" + id, {
            method: "DELETE"
        });

        if (!resp.ok) {
            toastError(await resp.text())
            return;
        }

        router.refresh();
    }

    return (
        <div className="w-full h-full flex">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Reference</th>
                        <th>Status</th>
                        <th>Warehouse</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseRequests.map((x, idx) => (
                        <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{x.reference}</td>
                            <td>{StatusToString(x.status)}</td>
                            <td>{x.warehouse.name}</td>
                            <td className="space-x-2 space-y-2">
                                <Link className="btn btn-primary" href={"/purchase-request/detail/" + x.id}>Detail</Link>
                                <form onSubmit={(e) => onSubmit(e, x.id)}>
                                    <button type="submit" className={"btn btn-error " + (x.status !== StatusEnum.DRAFT ? "btn-disabled" : "")}>Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
