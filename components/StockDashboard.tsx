"use client"

import { Stock } from "@/types/stock";

export default function StockDashboard({ stocks }: { stocks: Stock[] }) {
    return (
        <div className="w-full h-full flex flex-col">
            <table className="table flex-1">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Warehouse</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((x, idx) => (
                        <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{x.product.name} - {x.product.sku}</td>
                            <td>{x.warehouse.name}</td>
                            <td>{x.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
