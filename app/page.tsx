"use server"

import StockDashboard from "@/components/StockDashboard";
import { Stock } from "@/types/stock";
import { getApiEndpoint } from "@/utils/http";

export default async function Home() {
  const stockResp = await fetch(getApiEndpoint("stocks"))
  if (!stockResp.ok) {
    throw new Error("Failed to get stocks")
  }

  const stocks = await stockResp.json() as Stock[];

  return (
    <StockDashboard stocks={stocks}/>
  );
}
