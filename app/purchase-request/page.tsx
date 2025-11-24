"use server"

import PurchaseRequestTable from "@/components/PurchaseRequestTable";
import { PurchaseRequestSummary, type PurchaseRequest } from "@/types/purchaserequest";
import { getApiEndpoint } from "@/utils/http"
import Link from "next/link";

export default async function PurchaseRequest() {
  const purchaseRequestsResp = await fetch(getApiEndpoint("/purchase/request"))

  if (!purchaseRequestsResp.ok) {
    throw new Error("failed to get purchase requests")
  }

  const purchaseRequests = await purchaseRequestsResp.json() as PurchaseRequestSummary[];

  return (
    <div className="flex flex-col">
      <Link className="btn btn-primary grow-0 min-w-0 max-w-0 px-8 py-2" href="/purchase-request/new">Add</Link>
      <PurchaseRequestTable purchaseRequests={purchaseRequests}/>
    </div>
  )
}
